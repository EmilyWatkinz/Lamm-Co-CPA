require('dotenv').config();

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.MAX_UPLOAD_BYTES || 25 * 1024 * 1024),
    files: Number(process.env.MAX_UPLOAD_FILES || 10),
  },
});

const port = Number(process.env.SERVER_PORT || 5001);
const recipientEmail = process.env.UPLOAD_RECIPIENT_EMAIL || 'ewatkins@lammcocpa.com';
const graphSimpleSendMaxBytes = Number(process.env.GRAPH_SIMPLE_SEND_MAX_BYTES || 3500000);

app.use((request, response, next) => {
  const requestOrigin = request.headers.origin;
  const allowedOrigin = process.env.CORS_ORIGIN || requestOrigin || '*';

  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Vary', 'Origin');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  return next();
});

function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false' && port === 587,
    auth: {
      user,
      pass,
    },
  });
}

function hasGraphConfig() {
  return Boolean(
    process.env.MS_GRAPH_TENANT_ID
      && process.env.MS_GRAPH_CLIENT_ID
      && process.env.MS_GRAPH_CLIENT_SECRET
      && (process.env.MS_GRAPH_SENDER_USER || process.env.EMAIL_FROM)
  );
}

async function getGraphAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${process.env.MS_GRAPH_TENANT_ID}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: process.env.MS_GRAPH_CLIENT_ID,
    client_secret: process.env.MS_GRAPH_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const tokenPayload = await tokenResponse.json().catch(() => ({}));

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    throw new Error('Microsoft Graph token request failed. Check tenant ID, client ID, and client secret.');
  }

  return tokenPayload.access_token;
}

async function sendViaGraph({ files, clientEmail, subject, textBody }) {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > graphSimpleSendMaxBytes) {
    throw new Error('Selected files are too large for direct Graph send. Reduce attachment size and try again.');
  }

  const accessToken = await getGraphAccessToken();
  const senderUser = process.env.MS_GRAPH_SENDER_USER || process.env.EMAIL_FROM;
  const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderUser)}/sendMail`;

  const graphPayload = {
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: textBody,
      },
      toRecipients: [{
        emailAddress: { address: recipientEmail },
      }],
      replyTo: clientEmail
        ? [{ emailAddress: { address: clientEmail } }]
        : undefined,
      attachments: files.map((file) => ({
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: file.originalname,
        contentType: file.mimetype || 'application/octet-stream',
        contentBytes: file.buffer.toString('base64'),
      })),
    },
    saveToSentItems: true,
  };

  const sendResponse = await fetch(sendMailUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphPayload),
  });

  if (!sendResponse.ok) {
    const errorPayload = await sendResponse.json().catch(() => ({}));
    const graphMessage = errorPayload?.error?.message || 'Microsoft Graph sendMail failed.';
    throw new Error(graphMessage);
  }
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.post('/api/secure-upload', upload.array('files', 10), async (request, response) => {
  try {
    const files = request.files || [];
    const { clientName = '', clientEmail = '', notes = '' } = request.body;

    if (!files.length) {
      return response.status(400).json({ message: 'Please choose at least one file to upload.' });
    }

    const subjectBits = ['Secure document upload'];
    if (clientName) subjectBits.push(`from ${clientName}`);
    const subject = subjectBits.join(' ');

    const textParts = [
      'A secure document upload was submitted from the website.',
      clientName ? `Client name: ${clientName}` : null,
      clientEmail ? `Client email: ${clientEmail}` : null,
      notes ? `Notes: ${notes}` : null,
      '',
      'Attached files:',
      ...files.map((file) => `- ${file.originalname}`),
    ].filter(Boolean);

    const textBody = textParts.join('\n');

    if (hasGraphConfig()) {
      await sendViaGraph({
        files,
        clientEmail,
        subject,
        textBody,
      });
    } else {
      const transporter = createTransporter();

      if (!transporter) {
        return response.status(500).json({
          message: 'Email settings are not configured. Set Microsoft Graph app settings or SMTP settings.',
        });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: recipientEmail,
        replyTo: clientEmail || undefined,
        subject,
        text: textBody,
        attachments: files.map((file) => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        })),
      });
    }

    return response.json({
      message: `Documents emailed to ${recipientEmail}.`,
    });
  } catch (error) {
    console.error('Secure upload send error:', error);
    return response.status(500).json({
      message: error.message || 'We could not send the files by email. Check your settings and try again.',
    });
  }
});

const buildPath = path.join(__dirname, 'build');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.use((request, response, next) => {
    if (request.path.startsWith('/api/')) {
      return next();
    }

    if (request.method === 'GET') {
      return response.sendFile(path.join(buildPath, 'index.html'));
    }

    return next();
  });
}

app.use((request, response) => {
  if (request.path.startsWith('/api/')) {
    return response.status(404).json({ message: 'API route not found.' });
  }

  return response.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Upload API listening on port ${port}`);
});
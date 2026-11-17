const multer = require('multer');
const nodemailer = require('nodemailer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.MAX_UPLOAD_BYTES || 25 * 1024 * 1024),
    files: Number(process.env.MAX_UPLOAD_FILES || 10),
  },
});

function runMiddleware(request, response, middleware) {
  return new Promise((resolve, reject) => {
    middleware(request, response, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    requireTLS: process.env.SMTP_REQUIRE_TLS !== 'false' && port === 587,
    auth: { user, pass },
  });
}

function hasGraphConfig() {
  return Boolean(
    process.env.MS_GRAPH_TENANT_ID &&
    process.env.MS_GRAPH_CLIENT_ID &&
    process.env.MS_GRAPH_CLIENT_SECRET &&
    (process.env.MS_GRAPH_SENDER_USER || process.env.EMAIL_FROM)
  );
}

async function getGraphAccessToken() {
  const response = await fetch(`https://login.microsoftonline.com/${process.env.MS_GRAPH_TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.MS_GRAPH_CLIENT_ID,
      client_secret: process.env.MS_GRAPH_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    throw new Error('Microsoft Graph token request failed. Check the Graph app settings.');
  }
  return payload.access_token;
}

async function sendViaGraph({ recipient, sender, files, clientEmail, subject, textBody }) {
  const maxBytes = Number(process.env.GRAPH_SIMPLE_SEND_MAX_BYTES || 3500000);
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > maxBytes) {
    throw new Error('Selected files are too large for direct email send. Reduce attachment size and try again.');
  }

  const accessToken = await getGraphAccessToken();
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        subject,
        body: { contentType: 'Text', content: textBody },
        toRecipients: [{ emailAddress: { address: recipient } }],
        replyTo: clientEmail ? [{ emailAddress: { address: clientEmail } }] : undefined,
        attachments: files.map((file) => ({
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: file.originalname,
          contentType: file.mimetype || 'application/octet-stream',
          contentBytes: file.buffer.toString('base64'),
        })),
      },
      saveToSentItems: true,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload?.error?.message || 'Microsoft Graph sendMail failed.');
  }
}

module.exports = async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    await runMiddleware(request, response, upload.array('files', 10));

    const files = request.files || [];
    const { clientName = '', clientEmail = '', notes = '' } = request.body || {};
    if (!files.length) {
      return response.status(400).json({ message: 'Please choose at least one file to upload.' });
    }

    const recipient = process.env.UPLOAD_RECIPIENT_EMAIL || 'ar@lammcocpa.com';
    const subject = ['Secure document upload', clientName ? `from ${clientName}` : null].filter(Boolean).join(' ');
    const textBody = [
      'A secure document upload was submitted from the website.',
      clientName ? `Client name: ${clientName}` : null,
      clientEmail ? `Client email: ${clientEmail}` : null,
      notes ? `Notes: ${notes}` : null,
      '',
      'Attached files:',
      ...files.map((file) => `- ${file.originalname}`),
    ].filter(Boolean).join('\n');

    if (hasGraphConfig()) {
      await sendViaGraph({
        recipient,
        sender: process.env.MS_GRAPH_SENDER_USER || process.env.EMAIL_FROM,
        files,
        clientEmail,
        subject,
        textBody,
      });
    } else {
      const transporter = createTransporter();
      if (!transporter) {
        return response.status(500).json({
          message: 'Email settings are not configured. Set Microsoft Graph or SMTP settings in Vercel.',
        });
      }
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: recipient,
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

    return response.json({ message: `Documents emailed to ${recipient}.` });
  } catch (error) {
    return response.status(500).json({
      message: error.message || 'We could not send the files by email. Please try again.',
    });
  }
};

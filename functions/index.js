const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const { logger } = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const nodemailer = require('nodemailer');

initializeApp();
const firestore = getFirestore();
const storage = getStorage();

const MS_GRAPH_TENANT_ID = defineSecret('MS_GRAPH_TENANT_ID');
const MS_GRAPH_CLIENT_ID = defineSecret('MS_GRAPH_CLIENT_ID');
const MS_GRAPH_CLIENT_SECRET = defineSecret('MS_GRAPH_CLIENT_SECRET');
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');

async function getGraphToken() {
  const tenantId = MS_GRAPH_TENANT_ID.value();
  const clientId = MS_GRAPH_CLIENT_ID.value();
  const clientSecret = MS_GRAPH_CLIENT_SECRET.value();

  const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  });

  const tokenPayload = await tokenResponse.json().catch(() => ({}));

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    throw new Error(tokenPayload?.error_description || 'Failed to get Microsoft Graph access token.');
  }

  return tokenPayload.access_token;
}

async function downloadAttachment(attachment) {
  const fileName = attachment?.filename || attachment?.name || 'attachment';
  const defaultContentType = attachment?.contentType || 'application/octet-stream';

  if (attachment?.storagePath) {
    try {
      const bucket = attachment.bucket ? storage.bucket(attachment.bucket) : storage.bucket();
      const file = bucket.file(attachment.storagePath);
      const [exists] = await file.exists();

      if (!exists) {
        throw new Error(`Storage object not found at ${attachment.storagePath}`);
      }

      const [buffer] = await file.download();
      const [metadata] = await file.getMetadata().catch(() => [{}]);

      return {
        name: fileName,
        contentBytes: Buffer.from(buffer).toString('base64'),
        contentType: metadata?.contentType || defaultContentType,
      };
    } catch (storageError) {
      logger.warn('Storage path download failed, falling back to URL download', {
        storagePath: attachment.storagePath,
        error: storageError?.message || String(storageError),
      });
    }
  }

  if (!attachment?.path && !attachment?.downloadUrl) {
    return null;
  }

  const sourceUrl = attachment.downloadUrl || attachment.path;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to download attachment from ${sourceUrl}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    name: fileName,
    contentBytes: Buffer.from(arrayBuffer).toString('base64'),
    contentType: defaultContentType,
  };
}

function buildMailContent(data) {
  const clientName = data.clientName || 'Unknown';
  const clientEmail = data.clientEmail || '';
  const notes = data.notes || '';
  const attachments = Array.isArray(data.attachments) ? data.attachments : [];

  const fileLines = attachments.map((attachment) => `- ${attachment?.filename || 'Unnamed file'}${attachment?.downloadUrl ? `\n  ${attachment.downloadUrl}` : ''}`);

  const bodyParts = [
    'A secure document upload was submitted through the website.',
    `Client name: ${clientName}`,
    clientEmail ? `Client email: ${clientEmail}` : null,
    notes ? `Notes: ${notes}` : null,
    '',
    'Uploaded files:',
    ...fileLines,
  ].filter(Boolean);

  return {
    subject: data.message?.subject || `Secure document upload from ${clientName}`,
    text: data.message?.text || bodyParts.join('\n'),
    attachments,
  };
}

async function updateMailStatus(mailId, updates) {
  if (!mailId) {
    return;
  }

  await firestore.collection('mail').doc(mailId).set(
    {
      ...updates,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST || 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: (process.env.SMTP_SECURE || 'false') === 'true',
    requireTLS: (process.env.SMTP_REQUIRE_TLS || 'true') !== 'false',
    user: SMTP_USER.value(),
    pass: SMTP_PASS.value(),
  };
}

function hasSmtpCredentials() {
  const config = getSmtpConfig();
  return Boolean(config.user && config.pass);
}

async function sendViaSmtp({ recipient, sender, subject, text, attachments, data }) {
  const config = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const downloadedAttachments = [];
  for (const attachment of attachments) {
    const downloaded = await downloadAttachment(attachment);
    if (downloaded) {
      downloadedAttachments.push({
        filename: downloaded.name,
        content: Buffer.from(downloaded.contentBytes, 'base64'),
        contentType: downloaded.contentType,
      });
    }
  }

  await transporter.sendMail({
    from: sender,
    to: recipient,
    replyTo: data.clientEmail || undefined,
    subject,
    text,
    attachments: downloadedAttachments,
  });
}

exports.sendUploadNotification = onDocumentCreated({
  document: 'mail/{mailId}',
  secrets: [MS_GRAPH_TENANT_ID, MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET, SMTP_USER, SMTP_PASS],
}, async (event) => {
    const mailId = event.params?.mailId;

    try {
      const data = event.data?.data() || {};
      const recipient = 'ewatkins@lammcocpa.com';
    const sender = process.env.MS_GRAPH_SENDER_USER || process.env.EMAIL_FROM || recipient;

      if (!Array.isArray(data.attachments) || data.attachments.length === 0) {
        logger.warn('Mail document created without attachments');
      }

      const { subject, text, attachments } = buildMailContent(data);
      if (hasSmtpCredentials()) {
        await sendViaSmtp({ recipient, sender, subject, text, attachments, data });
      } else {
        const accessToken = await getGraphToken();

        const graphAttachments = [];
        for (const attachment of attachments) {
          const downloaded = await downloadAttachment(attachment);
          if (downloaded) {
            graphAttachments.push({
              '@odata.type': '#microsoft.graph.fileAttachment',
              name: downloaded.name,
              contentType: downloaded.contentType,
              contentBytes: downloaded.contentBytes,
            });
          }
        }

        const sendResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: {
              subject,
              body: {
                contentType: 'Text',
                content: text,
              },
              toRecipients: [
                {
                  emailAddress: {
                    address: recipient,
                  },
                },
              ],
              ...(data.clientEmail
                ? {
                    replyTo: [
                      {
                        emailAddress: {
                          address: data.clientEmail,
                        },
                      },
                    ],
                  }
                : {}),
              attachments: graphAttachments,
            },
            saveToSentItems: true,
          }),
        });

        if (!sendResponse.ok) {
          const errorText = await sendResponse.text().catch(() => '');
          let errorPayload = {};

          try {
            errorPayload = errorText ? JSON.parse(errorText) : {};
          } catch (parseError) {
            logger.warn('Graph sendMail returned non-JSON error body', { errorText });
          }

          logger.error('Graph sendMail failed', {
            status: sendResponse.status,
            statusText: sendResponse.statusText,
            errorPayload,
            errorText,
          });
          throw new Error(
            errorPayload?.error?.message || errorText || `Graph sendMail failed with status ${sendResponse.status}.`
          );
        }
      }

      await updateMailStatus(mailId, {
        status: 'sent',
        sentAt: FieldValue.serverTimestamp(),
        error: null,
      });

      return {
        ok: true,
        message: `Documents uploaded and email notification sent to ${recipient}.`,
      };
    } catch (error) {
      await updateMailStatus(mailId, {
        status: 'error',
        error: error?.message || 'Unknown mail delivery error',
      });
      logger.error('sendUploadNotification failed', error);
      throw error;
    }
});

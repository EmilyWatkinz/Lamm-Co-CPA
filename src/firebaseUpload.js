import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import firebaseApp from './firebaseClient';

function hasFirebaseConfig() {
  return Boolean(firebaseApp);
}

let authPromise = null;

async function ensureAnonymousAuth() {
  const auth = getAuth(firebaseApp);

  if (auth.currentUser) {
    return auth.currentUser;
  }

  if (!authPromise) {
    authPromise = signInAnonymously(auth)
      .then((result) => result.user)
      .finally(() => {
        authPromise = null;
      });
  }

  return authPromise;
}

export function isFirebaseUploadConfigured() {
  return hasFirebaseConfig();
}

function buildStoragePath(fileName) {
  const now = new Date();
  const datePath = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `secure-uploads/${datePath}/${unique}-${safeName}`;
}

async function uploadToStorage(files) {
  const storage = getStorage(firebaseApp);

  const uploads = await Promise.all(
    files.map(async (file) => {
      const path = buildStoragePath(file.name);
      const fileRef = ref(storage, path);
      await uploadBytes(fileRef, file, {
        contentType: file.type || 'application/octet-stream',
      });
      const downloadUrl = await getDownloadURL(fileRef);

      return {
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        path,
        downloadUrl,
      };
    })
  );

  return uploads;
}

async function queueMailDocument(payload) {
  const firestore = getFirestore(firebaseApp);
  const mailCollection = collection(firestore, 'mail');
  const docRef = await addDoc(mailCollection, {
    to: payload.to,
    message: payload.message,
    attachments: payload.attachments,
    clientName: payload.clientName,
    clientEmail: payload.clientEmail,
    notes: payload.notes,
    createdAt: serverTimestamp(),
    status: 'pending',
  });

  return {
    id: docRef.id,
    message: 'Upload received and queued for email delivery. We will send it as soon as processing completes.',
  };
}

export async function uploadFilesAndSendNotification({ files, clientName, clientEmail, notes }) {
  await ensureAnonymousAuth();
  const uploadedFiles = await uploadToStorage(files);
  const payload = {
    to: 'ewatkins@lammcocpa.com',
    message: {
      subject: `Secure document upload from ${clientName || 'Website visitor'}`,
      text: [
        'A secure document upload was submitted through the website.',
        clientName ? `Client name: ${clientName}` : null,
        clientEmail ? `Client email: ${clientEmail}` : null,
        notes ? `Notes: ${notes}` : null,
        '',
        'Attached files:',
        ...uploadedFiles.map((file) => `- ${file.name}`),
      ].filter(Boolean).join('\n'),
    },
    attachments: uploadedFiles.map((file) => ({
      filename: file.name,
      path: file.downloadUrl,
      downloadUrl: file.downloadUrl,
      storagePath: file.path,
      contentType: file.type,
      size: file.size,
    })),
    clientName,
    clientEmail,
    notes,
  };

  return queueMailDocument(payload);
}

import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyADEgvDutmvViGhzsNu2_k0zg-pxcqTfpk',
  authDomain: 'lamm-co-app.firebaseapp.com',
  projectId: 'lamm-co-app',
  storageBucket: 'lamm-co-app.firebasestorage.app',
  messagingSenderId: '614718824922',
  appId: '1:614718824922:web:91a727a006472c8bf060e3',
  measurementId: 'G-W3TR2D7SC9',
};

const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export default firebaseApp;
export { firebaseConfig };

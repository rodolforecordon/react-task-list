import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzHK6AYIrLzzpObV7PMwX2jm5P77wceKM',
  authDomain: 'react-task-list-1bbee.firebaseapp.com',
  projectId: 'react-task-list-1bbee',
  storageBucket: 'react-task-list-1bbee.appspot.com',
  messagingSenderId: '681733288230',
  appId: '1:681733288230:web:0cfe291e10555fb0cf11e7'
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export default {
  firebaseApp,
  auth,
  db,
};

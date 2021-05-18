import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBYSRc5uYSfw7VRWA4E08UTZMYNNnsSrY4',
  authDomain: 'databass-tasks.firebaseapp.com',
  projectId: 'databass-tasks',
  storageBucket: 'databass-tasks.appspot.com',
  messagingSenderId: '364898403267',
  appId: '1:364898403267:web:b4de2848a536327c313376',
};

export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

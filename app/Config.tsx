import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC5GJ8FoY54TSBRsVNq4vWd5JH0WbBErWA',
  authDomain: 'task-1fe59.firebaseapp.com',
  projectId: 'task-1fe59',
  storageBucket: 'task-1fe59.appspot.com',
  messagingSenderId: '970332961564',
  appId: '1:970332961564:web:e48389a7f4c38e920018d9',
  measurementId: 'G-JDSLSZWNBK',
};

firebase.initializeApp(firebaseConfig);

export { firebase };

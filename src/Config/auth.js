
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAGLN6PxTQyXwHIl2nGTaDhRX24jqVCyD4',
  authDomain: 'login-with-eddbb.firebaseapp.com',
  projectId: 'login-with-eddbb',
  storageBucket: 'login-with-eddbb.firebasestorage.app',
  messagingSenderId: '1032459590462',
  appId: '1:1032459590462:web:35f6f9af00d80dd624aa6f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
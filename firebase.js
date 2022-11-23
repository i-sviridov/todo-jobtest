import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDZniacPrvRnLsC2EskwbL5uquXD7xMto4',
  authDomain: 'todo-app-f2649.firebaseapp.com',
  databaseURL: 'https://todo-app-f2649-default-rtdb.firebaseio.com',
  projectId: 'todo-app-f2649',
  storageBucket: 'todo-app-f2649.appspot.com',
  messagingSenderId: '969130949775',
  appId: '1:969130949775:web:e4e7bdcf146fc8b59884fa',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

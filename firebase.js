import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
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

const db = getFirestore();

const collectionRef = collection(db, 'tasks');

/**
 * функция для получения всех документов с firebase
 * @return {array} возвращает массив элементов
 */
export function getDocuments() {
  return getDocs(collectionRef)
    .then((snapshot) => {
      let tasks = [];
      snapshot.docs.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });

      return tasks;
    })
    .catch((err) => console.log(err));
}

/**
 * функция для добавления элемента в firebase
 * @param {object} ивент, для preventDefault() и для аплоуда файлов
 * @param {string} title заголовок элемента
 * @param {string} task описание элемента
 * @param {string} date дата выполнения элемента
 * @return {object} возращает Promise
 */
export function addDocument(event, title, task, date) {
  event.preventDefault();
  const file = event.target[2]?.files[0];
  if (file) {
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file);
  }
  return addDoc(collectionRef, {
    title,
    task,
    date,
    filename: file ? file.name : '',
  });
}

/**
 * функция для удаления элемента в firebase
 * @param {object} event ивент, для preventDefault() и для аплоуда файлов
 * @param {string} id ид элемента для создания рефа для удаления документа
 * @return {object} Возвращает Promise
 */

export function deleteDocument(event, id) {
  event.preventDefault();
  const docRef = doc(db, 'tasks', id);
  return deleteDoc(docRef);
}

/**
 *
 * @param {object} event ивент, для preventDefault() и для аплоуда файлов
 * @param {string} title заголовок элемента
 * @param {string} task описание элемента
 * @param {string} date дата выполнения элемента
 * @param {string} id ид элемента для создания рефа для изменения документа
 * @return {object} Возвращает Promise
 */
export function editDocument(event, title, task, date, id) {
  event.preventDefault();
  const docRef = doc(db, 'tasks', id);

  const file = event.target[2]?.files[0];
  if (file) {
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file);
  }
  return updateDoc(docRef, {
    title,
    task,
    date,
    filename: file ? file.name : '',
  });
}

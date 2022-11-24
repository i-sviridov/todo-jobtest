import { useState, useEffect } from 'react';

import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

import {
  addDocument,
  deleteDocument,
  editDocument,
  getDocuments,
} from '../firebase';

export default function Home() {
  const [loadedTasks, setLoadedTasks] = useState();
  const [isFetchingDataApp, setIsFetchingDataApp] = useState(true);

  /**
   * Функция добавляет новый элемент в список todo
   * @param {object} event ивент, для preventDefault() и для аплоуда файлов
   * @param {string} title заголовок элемента
   * @param {string} task описание элемента
   * @param {string} date дата выполнения элемента
   * @return {object} Возвращает Promise
   */

  function SubmitNewTaskHandler(event, title, task, date) {
    return addDocument(event, title, task, date).then(() => {
      setIsFetchingDataApp(true);
    });
  }

  /**
   * функция для изменения элемента в firebase
   * @param {object} event ивент, для preventDefault() и для аплоуда файлов
   * @param {string} title заголовок элемента
   * @param {string} task описание элемента
   * @param {string} date дата выполнения элемента
   * @param {string} id ид элемента для создания рефа для изменения документа
   * @return {object} Возвращает Promise
   */
  function editTaskHandler(event, title, task, date, id) {
    return editDocument(event, title, task, date, id).then(() => {
      setIsFetchingDataApp(true);
    });
  }

  /**
   * функция для удаления элемента в firebase
   * @param {object} event ивент, для preventDefault() и для аплоуда файлов
   * @param {string} id ид элемента для создания рефа для удаления документа
   * @return {object} Возвращает Promise
   */

  function deleteTaskHandler(event, id) {
    return deleteDocument(event, id).then(() => {
      setIsFetchingDataApp(true);
    });
  }

  useEffect(() => {
    const fetchTasks = () => {
      getDocuments().then((loadedTasks) => {
        setLoadedTasks(loadedTasks);
        setIsFetchingDataApp(false);
      });
    };
    fetchTasks();
  }, [isFetchingDataApp]);

  return (
    <>
      <h1 className={'text-center'}>My Todo List</h1>
      <AddTask taskHandler={SubmitNewTaskHandler} />
      <TaskList
        deleteTaskHandler={deleteTaskHandler}
        editTaskHandler={editTaskHandler}
        data={loadedTasks}
      />
    </>
  );
}

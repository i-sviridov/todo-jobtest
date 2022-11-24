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

  function SubmitNewTaskHandler(event, title, task, date) {
    return addDocument(event, title, task, date).then(() => {
      setIsFetchingDataApp(true);
    });
  }

  function editTaskHandler(event, title, task, date, id) {
    return editDocument(event, title, task, date, id).then(() => {
      setIsFetchingDataApp(true);
    });
  }

  function deleteTaskHandler(event, id) {
    console.log(event, id);
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

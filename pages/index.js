import { useState, useEffect } from 'react';

import InputField from '../components/InputField';
import TaskList from '../components/TaskList';

export default function Home() {
  const [loadedTasks, setLoadedTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        'https://todo-app-f2649-default-rtdb.firebaseio.com/tasks.json'
      );

      const responseData = await response.json();

      const loadedTasks = [];

      for (const key in responseData) {
        loadedTasks.push(responseData[key].task);
      }

      setLoadedTasks(loadedTasks);
      setIsLoading(false);
    };
    fetchTasks();
  }, [isLoading]);

  console.log(loadedTasks);

  return (
    <>
      <h1 className={'text-center'}>My Todo List</h1>
      <InputField setIsLoading={setIsLoading} />
      <TaskList data={loadedTasks} />
    </>
  );
}

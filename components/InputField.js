import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import classes from './dist/InputField.module.css';

export default function InputField(props) {
  const [titleInput, setTitleInput] = useState('Enter your title');
  const [taskInput, setTaskInput] = useState('Enter your task');
  const [dateInput, setDateInput] = useState();

  function submitFormHandler(event) {
    event.preventDefault();
    const file = event.target[2]?.files[0];
    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      uploadBytes(storageRef, file);
    }

    fetch('https://todo-app-f2649-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify({
        title: titleInput,
        task: taskInput,
        date: dateInput,
        filename: file ? file.name : '',
      }),
    }).then(() => {
      setTitleInput('Enter your title');
      setTaskInput('Enter your task');
      setDateInput('');
      props.setIsLoading(true);
    });
  }

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <h2>Add a new task!</h2>
      <input
        type="text"
        id="title"
        name="title-field"
        value={titleInput}
        className={classes.input}
        onChange={(event) => setTitleInput(event.target.value)}
      />
      <input
        type="text"
        id="task"
        name="task-field"
        value={taskInput}
        className={classes.input}
        onChange={(event) => setTaskInput(event.target.value)}
      />
      <label htmlFor="file">Attach your file:</label>

      <input type="file" id="file" />
      <label htmlFor="start">Estimated date of completion:</label>

      <input
        type="date"
        id="start"
        name="trip-start"
        min="2022-11-01"
        max="2023-11-01"
        className={classes.input}
        value={dateInput}
        onChange={(event) => setDateInput(event.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

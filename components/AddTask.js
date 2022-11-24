import { useState } from 'react';

import classes from './AddTask.module.css';

export default function AddTask(props) {
  const [titleInput, setTitleInput] = useState(
    props.title ? props.title : 'Enter your title'
  );
  const [taskInput, setTaskInput] = useState(
    props.task ? props.task : 'Enter your task'
  );
  const [dateInput, setDateInput] = useState(props.date ? props.date : '');

  /**
   * функция для добавления/изменения элемента в firebase, обновления стэйтов
   * @param {object} event ивент, для preventDefault() и для аплоуда файлов
   */

  function submitFormHandler(event) {
    props
      .taskHandler(event, titleInput, taskInput, dateInput, props.id)
      .then(() => {
        setTitleInput('Enter Your Title');
        setTaskInput('Enter Your Task');
        setDateInput('');
        if (props.setIsEditMode) {
          props.setIsEditMode(false);
        }
      });
  }

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <h2>Submit a task!</h2>
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
      {props.isEditing && (
        <button
          onClick={() => {
            props.cancelEditing(false);
          }}
        >
          Cancel editing
        </button>
      )}
    </form>
  );
}

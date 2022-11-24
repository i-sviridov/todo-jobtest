import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import classes from './dist/TaskItem.module.css';
import AddTask from './AddTask';

export default function TaskItem(props) {
  const storage = getStorage();

  const [isOpened, setIsOpened] = useState(false);
  const [isTaskFinished, setIsTaskFinished] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const dateOfCompletion = new Date(props.data.date);
    if (currentDate > dateOfCompletion) {
      setIsTaskFinished(true);
    }
  }, [props]);

  let renderedContent;

  if (isEditMode) {
    renderedContent = (
      <>
        <div className={classes.tab}>
          <p
            onClick={() => {
              setIsOpened((prevValue) => {
                return !prevValue;
              });
            }}
            className={`${classes.title} ${
              isOpened ? `${classes.active}` : ''
            } ${isTaskFinished ? `${classes.finished}` : ''}`}
          >
            {props.data.title}
          </p>
        </div>
        <AddTask taskHandler={props.editTaskHandler} id={props.data.id} />
      </>
    );
  }

  if (!isEditMode) {
    renderedContent = (
      <div className={classes.tab}>
        <p
          onClick={() => {
            setIsOpened((prevValue) => {
              return !prevValue;
            });
          }}
          className={`${classes.title} ${isOpened ? `${classes.active}` : ''} ${
            isTaskFinished ? `${classes.finished}` : ''
          }`}
        >
          {props.data.title}
        </p>
        <div
          className={`${classes.content} ${
            isOpened ? `${classes.active}` : ''
          } ${isTaskFinished ? `${classes.finished}` : ''}`}
        >
          <p className={['text-center']}>{props.data.title}</p>
          <p className={['text-center']}>{props.data.task}</p>
          <p className={['text-center']}>
            Estimated date of completion: {props.data.date}
          </p>
          <div className={['text-center']}>
            <button
              onClick={() => {
                getDownloadURL(
                  ref(storage, `files/${props.data.filename}`)
                ).then((url) => {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = 'blob';
                  xhr.onload = function () {
                    var a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response);
                    a.download = '';
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                  };
                  xhr.open('GET', url);
                  xhr.send();
                });
              }}
            >
              Download your attachment
            </button>
          </div>
          <div className={classes.buttons}>
            <button
              onClick={() => {
                setIsTaskFinished((prevValue) => !prevValue);
              }}
            >
              {isTaskFinished ? 'Activate' : 'Finish'}
            </button>
            <button
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              Edit
            </button>
            <button
              onClick={(event) => {
                props.deleteTaskHandler(event, props.data.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return renderedContent;
}

import { useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import classes from './dist/TaskItem.module.css';

export default function TaskItem(props) {
  const storage = getStorage();

  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  let renderedContent = (
    <div className={classes.tab}>
      <p
        onClick={() => {
          setIsActive((prevValue) => {
            return !prevValue;
          });
        }}
        className={`${classes.title} ${isActive ? `${classes.active}` : ''}`}
      >
        {props.data.title}
      </p>
      <div
        className={`${classes.content} ${isActive ? `${classes.active}` : ''}`}
      >
        <div class={['text-center']}>
          <span>Task title:</span>
          <span>{props.data.title}</span>
        </div>
        <div class={['text-center']}>
          <span>Task name:</span>
          <span>{props.data.task}</span>
        </div>
        <div class={['text-center']}>
          <span>Estimated date of completion:</span>
          <span>{props.data.date}</span>
        </div>
        <div class={['text-center']}>
          <button
            onClick={() => {
              getDownloadURL(ref(storage, `files/${props.data.filename}`)).then(
                (url) => {
                  // // `url` is the download URL for 'images/stars.jpg'
                  // console.log(url);
                  // // This can be downloaded directly:
                  // const xhr = new XMLHttpRequest();
                  // xhr.responseType = 'blob';
                  // xhr.onload = (event) => {
                  //   const blob = xhr.response;
                  // };
                  // xhr.open('GET', url);
                  // xhr.send();
                  const link = document.createElement('a');
                  link.setAttribute('download', '');
                  link.setAttribute('href', url);
                  link.click();
                }
              );
            }}
          >
            Download your attachment
          </button>
        </div>
      </div>
    </div>
  );

  return renderedContent;
}

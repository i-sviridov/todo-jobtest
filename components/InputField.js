import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';

export default function InputField(props) {
  const [userInput, setUserInput] = useState('Enter your task');

  function userInputHandler(event) {
    setUserInput(event.target.value);
  }

  function submitFormHandler(event) {
    event.preventDefault();
    const file = event.target[1]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    uploadBytes(storageRef, file);
    fetch('https://todo-app-f2649-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify({
        task: userInput,
      }),
    }).then(() => {
      setUserInput('Enter your task');
      props.setIsLoading(true);
    });
  }

  return (
    <form onSubmit={submitFormHandler}>
      <input
        type="text"
        id="input"
        name="input-field"
        value={userInput}
        onChange={userInputHandler}
      />
      <input type="file" />
      <button>Click</button>
    </form>
  );
}

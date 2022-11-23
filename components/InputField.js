import { useState } from 'react';

export default function InputField() {
  const [userInput, setUserInput] = useState('Enter your task');
  console.log(userInput);

  function userInputHandler(event) {
    setUserInput(event.target.value);
  }

  function submitFormHandler(event) {
    event.preventDefault();
    fetch('https://todo-app-f2649-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify({
        task: userInput,
      }),
    }).then(() => setUserInput('Enter your task'));
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
      <button>Click</button>
    </form>
  );
}

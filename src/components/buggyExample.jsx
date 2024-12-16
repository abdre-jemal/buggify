

import { useState } from "react";

export function WelcomeMessageBug() {
  const [message, setMessage] = useState("");

  // Function to update the message
  const updateMessage = () => {
    setMessage("Welcome to Buggify!");
  };

  return (
    <div>
      <h1>{message}</h1>
      {/* Mistake: Invoking the function 
      instead of  passing a reference */}
      <button onClick={updateMessage()}>
        Click Me
      </button>
    </div>
  );
}

export function WelcomeMessageFix() {
  const [message, setMessage] = useState("");

  // Function to update the message
  const updateMessage = () => {
    setMessage("Welcome to Buggify!");
  };

  return (
    <div>
      <h1>{message}</h1>
      {/* Correct: Pass the function 
      reference */}
      <button onClick={updateMessage}>
        Click Me
      </button>
    </div>
  );
}

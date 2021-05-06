import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonBase,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Alex", message: "Hey Guys" },
    { username: "quzi", message: "Hey man" },
  ]);
  const [username, setUsername] = useState("");

  // useState  = variable in REACT
  // useEffect = run code on a condition in REACT

  useEffect(() => {
    // run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // const name = prompt('Please enter your name')
    setUsername(prompt("Please enter your name"));
  }, []); // [] is a condition and it is optional

  const sendMessage = (event) => {
    event.preventDefault();
    // Create a collection in firebase
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img src="https://img.icons8.com/carbon-copy/2x/imessage.png" alt="" />
      <h1>Hello, {username}! Welcome to Alegbcr Messenger 😉</h1>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message</InputLabel>
          <Input
            className="app__input"
            placeholder="Enter a message here"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;

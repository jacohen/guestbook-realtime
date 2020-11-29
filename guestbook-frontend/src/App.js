import logo from "./logo.svg";
import "./App.css";

import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// import 'fontsource-roboto';
// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  const [guestbook, setGuestbook] = React.useState([
    { name: "Jack", message: "This is a cool app" },
    {
      name: "Divya",
      message: "I like it too",
    },
  ]);

  //Add new guest message
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  //Post a Message
  const postMessage = () => {
    setGuestbook([...guestbook, { name: name, message: message }]);
  };

  return (
    <div className="App">
      <Typography variant="h4"> Write a Message </Typography>

      <Box component="span" m={1}>
        <form className="App" noValidate autoComplete="off">
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={postMessage}
          >
            Submit
          </Button>
        </form>
      </Box>

      <Typography variant="h4"> Messages </Typography>
      {guestbook.map((guest) => {
        return (
          <Paper style={{ marginBottom: "10px" }}>
            <TextField label="Name" value={guest.name} />

            <TextField label="Message" value={guest.message} />
          </Paper>
        );
      })}
    </div>
  );
}

export default App;

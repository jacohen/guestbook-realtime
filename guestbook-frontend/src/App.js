import logo from "./logo.svg";
import "./App.css";

import React from "react";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// import 'fontsource-roboto';
// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

function App() {
  const endpoint =
    "https://us-central1-divya-guestbook.cloudfunctions.net/guestbookApi";

  // const [guestbook, setGuestbook] = React.useState([
  //   { name: "Jack", message: "This is a cool app" },
  //   {
  //     name: "Divya",
  //     message: "I like it too",
  //   },
  // ]);

  const [guestbook, setGuestbook] = React.useState([]);

  //Add new guest message
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  //Get guestbook data
  const getGuestbook = () => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setGuestbook(data));
  };

  //Post a Message
  // const postMessage = () => {
  //   setGuestbook([...guestbook, { name: name, message: message }]);
  // };

  //Post Guestbook data
  const postMessage = () => {
    let guest = {
      name: name,
      message: message,
    };
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(guest),
    }).then(() => {
      getGuestbook();
    });
  };

  //on page load
  React.useEffect(() => {
    getGuestbook();
  }, []);


  return (
    <div className="App">
      <Typography variant="h2"> Guest Book </Typography>

      <Box display="flex" alignItems="center" justifyContent="center">
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
      </Box>

      <br />
      <Typography variant="h4"> Messages </Typography>
      {guestbook.map((guest) => {
        return (
          <div>
            {/* <Paper style={{ marginTop: "10px", marginBottom: "10px", paddingBottom:"10px"}}> */}
            <TextField label="Name" value={guest.name} />
            <TextField label="Message" value={guest.message} />
            {/* </Paper> */}
          </div>
        );
      })}
    </div>
  );
}

export default App;

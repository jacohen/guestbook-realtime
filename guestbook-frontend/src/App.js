// React
import React from "react";

// Material-ui
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// Firebase
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig.json";

// App
import "./App.css";

function App() {
  /** Realtime database *************************************************/
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  /** State ***********************************************************/
  // Guestbook
  const [guestbook, setGuestbook] = React.useState([]);

  // Message Form
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  /** Functions ********************************************************/
  // Post Guestbook data
  const postMessage = () => {
    firebase.database().ref().child("posts").push().set({
      name: name,
      message: message,
    });
  };

  /** Effects *********************************************************/
  // On page load
  React.useEffect(() => {
    // Connect to firebase stream
    firebase
      .database()
      .ref("/posts/")
      .on("child_added", (data) => {
        // console.log(data.val());
        setGuestbook((state) => [data.val(), ...state]);
      });
  }, []);

  /** Render page *****************************************************/
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
            <TextField label="Name" value={guest.name} />
            <TextField label="Message" value={guest.message} />
          </div>
        );
      })}
    </div>
  );
}

export default App;

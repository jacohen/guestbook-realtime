// React
import React from "react";

// Material-ui
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// App
import "./App.css";

function App() {
  const endpoint = process.env.REACT_APP_API_URL;

  /** State ***********************************************************/
  // Guestbook
  const [guestbook, setGuestbook] = React.useState([]);

  // Message Form
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  /** Functions ********************************************************/
  // Get guestbook data
  const getGuestbook = () => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setGuestbook(data));
  };

  // Post Guestbook data
  const postMessage = () => {
    let guest = {
      name: name,
      message: message,
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guest),
    }).then(() => {
      getGuestbook();
    });
  };

  /** Effects *********************************************************/
  // On page load
  React.useEffect(() => {
    getGuestbook();
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

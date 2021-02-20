import React, { useEffect, useState } from "react";
import "../public/stylesheets/App.css";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedInUser);
    if (loggedInUser) {
      setCurrentUser(loggedInUser.username);
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {loggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Landing
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Route>
          <Route path="/dashboard">
            {!loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Dashboard
                setLoggedIn={setLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

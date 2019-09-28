import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginComponent from "./components/Login";
import RegisterComponent from "./components/Register";
import UsersComponent from "./components/Users";
import HomeComponent from "./components/Home";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <LoginComponent />
          </Route>
          <Route path="/Register">
            <RegisterComponent />
          </Route>
          <Route path="/Users">
            <UsersComponent />
          </Route>
          <Route path="/">
            <HomeComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomeComponent from "./components/Home";
import UsersComponent from "./components/Users";
import LoginComponent from "./components/Login";
import RegisterComponent from "./components/Register";

const HOME_ROUTE = '/';
const LOGIN_ROUTE = '/login';
const REGISTER_ROUTE = '/register';
const USERS_ROUTE = '/users';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={HOME_ROUTE}>Home</Link>
            </li>
            <li>
              <Link to={LOGIN_ROUTE}>Login</Link>
            </li>
            <li>
              <Link to={REGISTER_ROUTE}>Register</Link>
            </li>
            <li>
              <Link to={USERS_ROUTE}>Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={LOGIN_ROUTE}>
            <LoginComponent />
          </Route>
          <Route path={REGISTER_ROUTE}>
            <RegisterComponent />
          </Route>
          <Route path={USERS_ROUTE}>
            <UsersComponent />
          </Route>
          <Route path={HOME_ROUTE}>
            <HomeComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
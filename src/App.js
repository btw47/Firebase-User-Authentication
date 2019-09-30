import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeComponent from "./components/Home";
import UsersComponent from "./components/Users";
import LoginComponent from "./components/Login";
import RegisterComponent from "./components/Register";
import NavigationComponent from "./components/Navigation";

import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE, HOME_ROUTE } from "./constants/routes";

export default function App() {
  return (
    <Router>
      <div>
        <NavigationComponent />

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
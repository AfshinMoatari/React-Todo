import React from "react";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import RestrictedRoute from "./Auth/RestrictedRoute";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Components/Tasks";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
      <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home}/>
        <RestrictedRoute exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;

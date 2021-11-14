import React, { Component } from "react";
// import { connect } from 'react-redux';
import Header from "./Header";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./Forms/Login";
import ResetPassword from "./Forms/Login/resetPassword";
import Home from "./Home";
import Signup from "./Forms/SignUp";
import ForgotPassword from "./Forms/Login/forgetPassword";
import JobCard from "./JobCard";
class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/jobs" component={JobCard} />
          <Route exact path="/jobPortal" component={Home} />
          <Redirect from="*" to="/Home" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Routes);

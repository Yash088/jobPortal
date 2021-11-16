import React, { Component } from "react";
import Header from "./Header";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Login from "./Forms/Login";
import ResetPassword from "./Forms/Login/resetPassword";
import Home from "./Home";
import Signup from "./Forms/SignUp";
import ForgotPassword from "./Forms/Login/forgetPassword";
import PostJob from "./Forms/Login/postJob";
import JobCard from "./JobCard";
import { connect } from "react-redux";
class Routes extends Component {
  render() {
    let token = localStorage.getItem("token");
    let auth = localStorage.getItem("auth");
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
          <Route exact path="/PostJob" component={PostJob} />
          <Route exact path="/jobPortal" component={Home} />

          <Redirect from="*" to="/Home" />
        </Switch>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // To get the list of employee details from store
    auth: state.login.loginData
  };
};
export default withRouter(connect(mapStateToProps, null)(Routes));

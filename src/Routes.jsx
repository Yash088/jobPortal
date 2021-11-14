/**
 * Created by abm on 2020-02-17.
 */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Header from "./Header";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import Login from "./Forms/Login";
import Home from "./Home";
import Signup from "./Forms/SignUp";

class Routes extends Component {
  // displayName = "Routes";

  // state = {
  //   activeComponent: this.props.location.pathname.slice(1)
  // };

  // changePage = (key, url) => {
  //   this.setState(
  //     {
  //       activeComponent: key
  //     },
  //     () => {
  //       this.props.history.push(url);
  //     }
  //   );
  // };

  render() {
    // const authCookie = Cookie.get("employeeAuth");
    // const authenticated = authCookie === "YXV0aGVudGljYXRlZA==";
    return (
      <React.Fragment>
        <Header />
        <Switch>
          {/* <Route exact path="/" component={authenticated ? Home : Login} /> */}
          {/* <Route exact path="*" component={authenticated ? Home : Login} /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Redirect from="/index.html" to="/" /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(Routes);

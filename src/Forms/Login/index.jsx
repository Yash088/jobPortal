import "./Style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      password: "",
      passwordError: false,
      error: ""
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }
  verifyLogin = (data) => {
    console.log(data);
    if (data.success) {
      if (data.data.userRole) {
        alert("Hi Candidate, No Further LInks for You.");
      } else {
        this.props.history.push("/jobs");
      }
    } else {
      if (data.message) {
        this.setState({ error: data.message });
      } else {
        let temp = Object.values(data.errors);
        this.setState({ error: temp[0] });
      }
    }
  };

  checkoutSubmit = async () => {
    let email = this.state.email;

    if (this.state.password === "" || this.state.password.length < 6) {
      this.setState({
        emailError: true,
        passwordError: true,
        error: "Incorrect email address or password."
      });
    } else {
      this.setState({ emailError: false, passwordError: "", error: "" });
      if (
        this.state.email === "" ||
        email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$") == null
      ) {
        this.setState({
          emailError: true,
          passwordError: true,
          error: "Incorrect email address or password."
        });
      } else {
        this.setState({ emailError: "", passwordError: "", error: "" });
        const data1 = {
          email: this.state.email,
          password: this.state.password,
          cb: (data) => this.verifyLogin(data)
        };
        this.props.login({
          email: this.state.email,
          password: this.state.password,
          cb: (data) => this.verifyLogin(data)
        });
      }
    }
  };
  changeInputValue = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-container">
          <Grid item className="login-card" md={7} lg={5} xs={10} sm={9}>
            <h3>Login</h3>
            <h5>Email</h5>
            <OutlinedInput
              fullWidth
              required
              type="email"
              onChange={(e) => this.changeInputValue(e.target.value, "email")}
              error={this.state.emailError ? true : false}
              labelWidth={0}
            />
            <h5 style={{ display: "inline-block" }}>Password</h5>
            <h5
              style={{
                display: "inline-block",
                float: "right",
                color: "#43AFFF"
              }}
            >
              <Link style={{ color: "#43AFFF" }} to="/forgotPassword">
                Forgot Password?
              </Link>
            </h5>
            <OutlinedInput
              required
              type="password"
              onChange={(e) =>
                this.changeInputValue(e.target.value, "password")
              }
              fullWidth
              error={this.state.passwordError ? true : false}
              labelWidth={0}
            />
            <div className="error-block">
              <p className="error">
                {this.state.error ? this.state.error : ""}
              </p>
            </div>
            <center>
              <Button
                variant="contained"
                style={{
                  margin: "20px",
                  backgroundColor: "#43AFFF",
                  color: "#fff"
                }}
                onClick={this.checkoutSubmit}
              >
                Submit
              </Button>
              <p style={{ fontWeight: 600 }}>
                New to MyJobs?
                <Link to="/signup" style={{ color: "#43AFFF" }}>
                  Create an account
                </Link>
              </p>
            </center>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.loginData
  };
};

const mapDispatchToProps = {
  login
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

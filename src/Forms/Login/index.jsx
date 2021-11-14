import "./Style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
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
  checkoutSubmit = async () => {
    let email = this.state.email;

    if (this.state.password === "") {
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
          password: this.state.password
        };
        //Call the Login Api
        axios
          .post("https://jobs-api.squareboat.info/api/v1/auth/login", data1)
          .then((res) => {
            //console.log(res);
            //console.log(res.data);
            if (res.data.success === true) {
              localStorage.setItem("token", res.data.data.token);
              this.props.history.push("/jobs");
            }
          })
          .catch(function (error) {
            if (error.data.message) {
              this.setState({ error: error.data.message });
            } else {
              let temp = Object.values(error.data.data.errors);
              this.setState({ error: temp[0] });
            }
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
                {" "}
                Forgot Password?{" "}
              </Link>
            </h5>
            <OutlinedInput
              required
              type="password"
              onChange={(e) =>
                this.changeInputValue(e.target.value, "password")
              }
              fullWidth
              helperText
              minLength="6"
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

export default withRouter(Login);

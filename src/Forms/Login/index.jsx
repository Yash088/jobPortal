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
      passwordError: false
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }
  checkoutSubmit = async () => {
    let email = this.state.email;

    if (this.state.password === "") {
      this.setState({ passwordError: "Invalid Password" });
    } else {
      this.setState({ passwordError: "" });
      if (
        this.state.email === "" ||
        email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$") == null
      ) {
        this.setState({ emailError: "Invalid Email" });
      } else {
        this.setState({ emailError: "", passwordError: "" });
        const data1 = {
          email: this.state.email,
          password: this.state.password
        };
        //Call the Login Api
        axios
          .post("https://jobs-api.squareboat.info/api/v1/auth/login", data1)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.success === true) {
              console.log("Logeed in", res.data.data.token);
              localStorage.setItem("token", res.data.data.token);
              if (res.data.data.userRole === 1) {
                alert("Hi admin");
              } else {
                alert("Welcome candidate");
              }
            } else {
              this.setState({ emailError: true, passwordError: true });
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
            <h5>Email</h5>
            <OutlinedInput
              fullWidth
              required
              type="email"
              onChange={(e) => this.changeInputValue(e.target.value, "email")}
              helperText={this.state.emailError ? this.state.emailError : ""}
              error={this.state.emailError ? true : false}
              labelWidth={0}
            />
            <h5 style={{ display: "inline-block" }}>Password</h5>
            <h5 style={{ display: "inline-block", float: "right" }}>
              Forgot Password
            </h5>
            <OutlinedInput
              required
              type="password"
              onChange={(e) =>
                this.changeInputValue(e.target.value, "password")
              }
              fullWidth
              helperText={
                this.state.passwordError ? this.state.passwordError : ""
              }
              error={this.state.passwordError ? true : false}
              labelWidth={0}
            />
            <center>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
                onClick={this.checkoutSubmit}
              >
                Submit
              </Button>
              <p>
                New to MyJobs?
                <Link to="/signup">Create an account</Link>
              </p>
            </center>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);

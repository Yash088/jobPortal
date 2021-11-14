import "./Style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      error: ""
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }
  checkoutSubmit = async () => {
    let email = this.state.email;

    if (
      this.state.email === "" ||
      email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$") == null
    ) {
      this.setState({
        emailError: true,
        passwordError: true,
        error: "Incorrect email address."
      });
    } else {
      this.setState({ emailError: "", error: "" });
      await axios
        .get(
          "https://jobs-api.squareboat.info/api/v1/auth/resetpassword?email=" +
            this.state.email
        )
        .then((res) => {
          //console.log(res);
          //console.log(res.data);
          if (res.data.success === true) {
            alert("Email has been sent");
            localStorage.setItem("resetToken", res.data.data.token);
            this.props.history.push("/");
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
            <h3>Forgot your password?</h3>
            <h6>
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </h6>
            <h5>Email</h5>
            <OutlinedInput
              fullWidth
              required
              type="email"
              onChange={(e) => this.changeInputValue(e.target.value, "email")}
              error={this.state.emailError ? true : false}
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
            </center>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ForgotPassword);

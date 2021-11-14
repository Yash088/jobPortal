import "./Style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordError: false,
      confirmPassword: "",
      confirmPasswordError: false,
      error: "",
      token: ""
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }
  async componentDidMount() {
    let temp = localStorage.getItem("resetToken");
    await axios
      .get("https://jobs-api.squareboat.info/api/v1/auth/resetpassword/" + temp)
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
        if (res.data.success != true) {
          alert("Invalid Token");
          this.props.history.push("/");
        }
        this.setState({ token: temp });
      })
      .catch(function (error) {
        alert("Invalid Token");
        this.props.history.push("/");
      });
  }
  checkoutSubmit = async () => {
    if (this.state.password === "") {
      this.setState({ passwordError: true, error: "Passsword is Incorrect" });
    } else {
      if (
        this.state.confirmPassword == "" ||
        this.state.confirmPassword !== this.state.password
      ) {
        this.setState({
          confirmPasswordError: true,
          error: "Passsword is not Matching.",
          passwordError: false
        });
      } else {
        this.setState({
          passwordError: "",
          confirmPasswordError: "",
          error: ""
        });
        const data1 = {
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          token: this.state.token
        };
        await axios
          .post(
            "https://jobs-api.squareboat.info/api/v1/auth/resetpassword",
            data1
          )
          .then((res) => {
            //console.log(res);
            //console.log(res.data);
            if (res.data.success === true) {
              alert("Password has been Updated");
              localStorage.setItem("token", res.data.data.token);
              this.props.history.push("/login");
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
            <h3>Reset Your Password</h3>
            <h6>Enter your new password below.</h6>
            <h5>Password</h5>

            <OutlinedInput
              required
              type="password"
              fullWidth
              onChange={(e) =>
                this.changeInputValue(e.target.value, "password")
              }
              helperText={
                this.state.passwordError ? this.state.passwordError : ""
              }
              error={this.state.passwordError ? true : false}
              labelWidth={0}
            />

            <h5>Confirm Password</h5>
            <OutlinedInput
              required
              fullWidth
              type="password"
              onChange={async (e) => {
                const data = await this.changeInputValue(
                  e.target.value,
                  "confirmPassword"
                );
                if (this.state.password == this.state.confirmPassword) {
                  this.setState({ confirmPasswordError: false });
                } else {
                  this.setState({ confirmPasswordError: true });
                }
              }}
              helperText={
                this.state.confirmPasswordError
                  ? this.state.confirmPasswordError
                  : ""
              }
              error={this.state.confirmPasswordError ? true : false}
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
                Reset
              </Button>
            </center>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ResetPassword);

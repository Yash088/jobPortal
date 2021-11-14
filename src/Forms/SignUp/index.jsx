import "./style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import {
  TextField,
  Grid,
  Button,
  OutlinedInput,
  typo
} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      name: "",
      nameError: false,
      password: "",
      passwordError: false,
      skill: "",
      confirmPassword: "",
      confirmPasswordError: false,
      userRole: 0,
      error: false
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }

  checkoutSubmit = async () => {
    let email = this.state.email;
    if (this.state.name === "") {
      this.setState({ nameError: "Invalid Name" });
    } else {
      this.setState({ nameError: "" });
      if (this.state.password === "") {
        this.setState({ passwordError: "Invalid Password" });
      } else {
        if (
          this.state.confirmPassword == "" ||
          this.state.confirmPassword !== this.state.password
        ) {
          this.setState({ confirmPasswordError: "Invalid Password" });
        } else {
          this.setState({ passwordError: "" });
          if (
            this.state.email === "" ||
            email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$") ==
              null
          ) {
            this.setState({ emailError: "Invalid Email" });
          } else {
            this.setState({ emailError: "", passwordError: "" });
            const data1 = {
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
              name: this.state.name,
              skills: this.state.skill,
              userRole: this.state.userRole
            };
            axios
              .post(
                "https://jobs-api.squareboat.info/api/v1/auth/register",
                data1
              )
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
            <h3>Signup</h3>
            <h5>Full Name</h5>
            <OutlinedInput
              fullWidth
              required
              type="Full Name"
              onChange={(e) => this.changeInputValue(e.target.value, "name")}
              helperText={this.state.nameError ? this.state.nameError : ""}
              error={this.state.nameError ? true : false}
              labelWidth={0}
            />
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
            <div className="checkout-input-wrapper">
              <div>
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
              </div>
              <div>
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
              </div>
            </div>
            <h5>Skills</h5>
            <OutlinedInput
              fullWidth
              type="skill"
              onChange={(e) => this.changeInputValue(e.target.value, "skill")}
              labelWidth={0}
            />
            <center>
              <p style={{}}>{this.state.error ? this.state.error : ""}</p>
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
                <Link to="/login">Already have a account</Link>
              </p>
            </center>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Signup);

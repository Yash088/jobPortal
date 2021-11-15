import "./style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import axios from "axios";

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
      error: false,
      Recuiterflag: true,
      flag: 0
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }

  checkoutSubmit = async () => {
    let email = this.state.email;
    if (
      this.state.name === "" ||
      this.state.name.match("^[a-zA-Z]+$") == null
    ) {
      this.setState({ nameError: "Invalid Name" });
    } else {
      this.setState({ nameError: "" });
      if (
        this.state.email === "" ||
        email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$") == null
      ) {
        this.setState({ emailError: "Invalid Email" });
      } else {
        this.setState({ emailError: "" });
        if (this.state.password === "" || this.state.password.length <= 6) {
          this.setState({
            passwordError: "Invalid Password"
          });
        } else {
          this.setState({ passwordError: false, error: "" });
          if (
            this.state.confirmPassword == "" ||
            this.state.confirmPassword !== this.state.password
          ) {
            this.setState({
              confirmPasswordError: "Invalid Confirm Password"
            });
          } else {
            this.setState({ confirmPasswordError: false });

            const data1 = {
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
              name: this.state.name,
              skills: this.state.skill,
              userRole: this.state.flag
            };
            this.props.signup({
              email: this.state.email,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword,
              name: this.state.name,
              skills: this.state.skill,
              userRole: this.state.flag,
              cb: (data) => this.verifyLogin(data)
            });
            axios
              .post(
                "https://jobs-api.squareboat.info/api/v1/auth/register",
                data1
              )
              .then((res) => {
                if (res.data.success === true) {
                  localStorage.setItem("token", res.data.data.token);
                  localStorage.setItem("auth", res.data.data.userRole);
                  this.props.history.push("/jobs");
                }
              })
              .catch((error) => {
                console.clear();
                if (error.response.data.message) {
                  this.setState({ error: error.response.data.message });
                } else {
                  let temp = Object.values(error.response.data.errors[0]);
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
            <h5>I am a</h5>
            <div style={{ display: "inline-block" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: this.state.flag ? "#E8E8E833" : "#43AFFF",
                  textTransform: "capitalize"
                }}
                startIcon={<AccountBoxOutlinedIcon />}
                onClick={() => this.changeInputValue(!this.state.flag, "flag")}
              >
                Recruiter
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: this.state.flag ? "#43AFFF" : "#E8E8E833",
                  textTransform: "capitalize",
                  marginLeft: "20px"
                }}
                startIcon={<AccountBoxOutlinedIcon />}
                onClick={() => this.changeInputValue(!this.state.flag, "flag")}
                startIcon={<GroupOutlinedIcon />}
              >
                Candidate
              </Button>
            </div>
            <h5>Full Name</h5>
            <TextField
              fullWidth
              required
              type="Full Name"
              variant="outlined"
              onChange={(e) => this.changeInputValue(e.target.value, "name")}
              helperText={this.state.nameError ? this.state.nameError : ""}
              error={this.state.nameError ? true : false}
            />
            <h5>Email</h5>
            <TextField
              fullWidth
              required
              type="email"
              variant="outlined"
              onChange={(e) => this.changeInputValue(e.target.value, "email")}
              helperText={this.state.emailError ? this.state.emailError : ""}
              error={this.state.emailError ? true : false}
            />
            <div className="checkout-input-wrapper">
              <div>
                <h5>Password</h5>

                <TextField
                  required
                  type="password"
                  variant="outlined"
                  fullWidth
                  onChange={(e) =>
                    this.changeInputValue(e.target.value, "password")
                  }
                  error={this.state.passwordError ? true : false}
                />
              </div>
              <div>
                <h5>Confirm Password</h5>
                <TextField
                  required
                  fullWidth
                  type="password"
                  variant="outlined"
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
                  error={this.state.confirmPasswordError ? true : false}
                />
              </div>
            </div>
            <h5>Skills</h5>
            <TextField
              fullWidth
              type="skill"
              variant="outlined"
              onChange={(e) => this.changeInputValue(e.target.value, "skill")}
            />
            <div className="error-block">
              <p className="error">
                {this.state.error ? this.state.error : ""}
              </p>
            </div>
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

import "./Style.scss";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titleError: false,
      description: "",
      descriptionError: false,
      location: "",
      locationError: false,
      error: "",
      token: ""
    };
    this.checkoutSubmit = this.checkoutSubmit.bind(this);
  }
  componentDidMount() {
    let temp = localStorage.getItem("token");
    if (!temp) {
      alert("Session Expired Please relogin");
      this.props.history.push("/login");
    }
    this.setState({ token: temp });
  }
  checkoutSubmit = async () => {
    if (this.state.name == "") {
      this.setState({
        titleError: true,
        error: "All fields are mandatory."
      });
    } else {
      this.setState({ titleError: false, error: "" });
      if (this.state.description == "") {
        this.setState({
          descriptionError: true,
          error: "All fields are mandatory."
        });
      } else {
        this.setState({ descriptionError: "", error: "" });
        if (this.state.location == "") {
          this.setState({
            locationError: true,
            error: "All fields are mandatory."
          });
        } else {
          this.setState({ locationError: "", error: "" });

          const data1 = {
            title: this.state.title,
            description: this.state.description,
            location: this.state.location
          };
          axios
            .post("https://jobs-api.squareboat.info/api/v1/auth/jobs", data1, {
              headers: {
                Authorization: this.state.token
              }
            })
            .then((res) => {
              if (res.data.success === true) {
                alert("Job created");
                this.props.history.push("/jobs");
              }
            })
            .catch(function (error) {
              console.clear();
              if (error.response.data.message) {
                this.setState({ error: error.response.data.message });
              } else {
                let temp = Object.values(error.data.data.errors);
                this.setState({ error: temp[0] });
              }
            });
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
            <h3>Post A Job</h3>
            <h5>Job title</h5>
            <OutlinedInput
              fullWidth
              required
              onChange={(e) => this.changeInputValue(e.target.value, "title")}
              error={this.state.jobError ? true : false}
              labelWidth={0}
            />
            <h5>Description</h5>
            <OutlinedInput
              required
              onChange={(e) =>
                this.changeInputValue(e.target.value, "description")
              }
              fullWidth
              maxRows={6}
              error={this.state.descriptionError ? true : false}
              labelWidth={0}
            />
            <h5>Location</h5>
            <OutlinedInput
              required
              onChange={(e) =>
                this.changeInputValue(e.target.value, "location")
              }
              fullWidth
              error={this.state.locationError ? true : false}
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

export default withRouter(Login);

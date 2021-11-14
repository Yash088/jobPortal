import "./style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import image from "../images/image.jpg";
import logo1 from "../images/logo1.png";
// import logo2 from '..//images/logo2.jpg'
import logo3 from "../images/logo3.png";
import logo4 from "../images/logo4.png";
import logo5 from "../images/logo5.png";
import logo6 from "../images/logo6.png";
import logo7 from "../images/logo7.png";
import { withRouter } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: true,
      open: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="bg masthead-container">
          <div className="masthead-data-left">
            <div className="text-container">
              <h1>Welcome to</h1>
              <h1>
                <b>
                  <span style={{ color: "white" }}>My</span>
                  <span style={{ color: "#43AFFF" }}>Jobs</span>
                </b>
              </h1>
              <div className="masthead-desc">
                <Button
                  variant="contained"
                  style={{
                    background: "#43AFFF",
                    color: "white",
                    textTransform: "capitalize"
                  }}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
          <div className="masthead-data-right">
            <div className="text-container">
              <img
                src={image}
                alt="recuit"
                style={{ borderRadius: "4%" }}
                className="masthead-image"
              />
            </div>
          </div>
        </div>
        <div className="section-wrapper">
          <h1 style={{ color: "#4D618E", fontWeight: "600" }}>Why Us</h1>
          <div className="whyUs-container">
            <div className="whyUs-box">
              <div className="whyUs-heading">
                <h1>Get more visibility</h1>
              </div>
              <p className="whyUs-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="whyUs-box">
              <div className="whyUs-heading">
                <h1>Organize your candidates</h1>
              </div>
              <p className="whyUs-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="whyUs-box">
              <div className="whyUs-heading">
                <h1>Verify their abilities</h1>
              </div>
              <p className="whyUs-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </div>
        <div class="section-wrapper">
          <h1
            style={{
              color: "#4D618E",
              fontWeight: "600",
              textTransform: "capitalize"
            }}
          >
            companies who trust us
          </h1>
          <div className="whyUs-container partner-container">
            <div className="">
              <img src={logo1} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo5} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo3} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo6} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo7} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo3} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo4} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo1} className="img-fluid" />
            </div>
            <div className="">
              <img src={logo5} className="img-fluid" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);

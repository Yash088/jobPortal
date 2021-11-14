import "./style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
class Header extends Component {
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
        <div className="static-data">
          <div className="nav-wrapper">
            <div>
              <b>
                <span style={{ color: "white" }}>My</span>
                <span style={{ color: "#43AFFF" }}>Jobs</span>
              </b>
            </div>
            <div>
              <Button
                style={{
                  color: "white",
                  border: "1px solid #43AFFF",
                  backgroundColor: "#43AFFF33",
                  opacity: "0.8"
                }}
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Login/Signup
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Header);

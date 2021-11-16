import "./style.scss";
// import Header from "./Header";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../redux/actions/login";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: true,
      open: false,
      anchorEl: null
    };
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    // (event.currentTarget);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    // setAnchorEl(null);
  };

  render() {
    let token = localStorage.getItem("token");
    let auth = localStorage.getItem("auth");
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
              {token ? (
                auth ? (
                  <React.Fragment>
                    <div style={{ display: "flex" }}>
                      <Button
                        style={{
                          color: "white",
                          border: "1px solid #43AFFF",
                          backgroundColor: "#43AFFF33",
                          opacity: "0.8",
                          marginRight: "30px"
                        }}
                        onClick={() => {
                          this.props.history.push("/PostJob");
                        }}
                      >
                        Post A Job
                      </Button>

                      <div>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={this.handleClick}
                          style={{
                            color: "white",
                            borderRadius: "60%",
                            backgroundColor: "#d9efff",
                            height: "40px",
                            width: "40px",
                            fontSize: "25px",
                            textAlign: "center",
                            color: "#303f60"
                          }}
                        >
                          A
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          // keepMounted
                          style={{ marginTop: "40px" }}
                          open={this.state.anchorEl}
                          onClose={this.handleClose}
                        >
                          <MenuItem
                            onClick={() => {
                              this.props.logout();
                              this.props.history.push("/");
                            }}
                            data
                          >
                            Logout
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <Button
                    style={{
                      color: "white",
                      border: "1px solid #43AFFF",
                      backgroundColor: "#43AFFF33",
                      opacity: "0.8"
                    }}
                    onClick={() => {
                      this.props.logout();
                      this.props.history.push("/login");
                    }}
                  >
                    Logout
                  </Button>
                )
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // To get the list of employee details from store
    auth: state.login.loginData
  };
};
const mapDispatchToProps = {
  logout
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

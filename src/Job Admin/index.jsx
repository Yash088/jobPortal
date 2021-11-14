import "./App.css";
// import Header from "./Header";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import React, { Component } from "react";
import { TextField, Grid, Button, OutlinedInput } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Modal from "@material-ui/core/Modal";
import axois from axois;
import Fade from "@material-ui/core/Fade";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: true,
      open: false
    };
  }
  async componentDidMount(){
    await axois.get('https://jobs-api.squareboat.info/api/v1/jobs',).then((data)=>{
      console.log(data)
      this.setState({data:data})
    })
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <React.Fragment>
        {/* //Nav bar */}
        {this.state.data ? (
          //Outer padding so that container can come inwards
          <div className="job-container">
            <div className="job-card-container">
              <div className="job-card">
                <h4>Front end developer</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt…
                </p>
                <p
                  style={{
                    display: "inline-block",
                    float: "left",
                    fontSize: "17px"
                  }}
                >
                  <LocationOnOutlinedIcon className="location-icon" />
                  Banglore
                </p>
                <Button
                  style={{
                    display: "inline-block",
                    color: "#303F60",
                    background: "#43AFFF33",
                    float: "right",
                    textTransform: "capitalize"
                  }}
                  onClick={this.handleOpen}
                >
                  View Applications
                </Button>
              </div>
              <div className="job-card">
                <h4>Front end developer</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt…
                </p>
                <p
                  style={{
                    display: "inline-block",
                    float: "left",
                    fontSize: "17px"
                  }}
                >
                  <LocationOnOutlinedIcon className="location-icon" />
                  Banglore
                </p>
                <Button
                  style={{
                    display: "inline-block",
                    color: "#303F60",
                    background: "#43AFFF33",
                    float: "right",
                    textTransform: "capitalize"
                  }}
                >
                  View Applications
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-post-container">
            <DescriptionOutlinedIcon
              color="disabled"
              style={{ fontSize: 80 }}
            />
            <p>Your posted jobs will show here!</p>
            <Button style={{ background: "#43AFFF", color: "white" }}>
              Post a Job
            </Button>
          </div>
        )}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}>
            <div
              style={{
                position: "absolute",
                width: "60vw",
                backgroundColor: "#fff",
                justifyContent: "center"
              }}
            >
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default App;

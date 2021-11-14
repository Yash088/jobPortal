import "./style.scss";
// import Header from "./Header";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import React, { Component } from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  Container,
  Grid
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      error: "",
      modalData: []
    };
  }
  async componentDidMount() {
    await axios
      .get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs", {
        headers: {
          Authorization: this.state.token
        }
      })
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(function (error) {});
  }
  handleOpen = async () => {
    //calling single job api
    await axios
      .get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs", {
        headers: {
          Authorization: this.state.token
        }
      })
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ modalData: res.data.data });
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
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <React.Fragment>
        {/* //Nav bar */}
        {this.state.data.length > 0 ? (
          //Outer padding so that container can come inwards
          <div className="job-container">
            <div className="job-card-container">
              {this.state.data.map((job) => (
                <div className="job-card" key={job.id}>
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                  <p
                    style={{
                      display: "inline-block",
                      float: "left",
                      fontSize: "17px"
                    }}
                  >
                    <LocationOnOutlinedIcon className="location-icon" />
                    {job.location}
                  </p>
                  <Button
                    style={{
                      display: "inline-block",
                      color: "#303F60",
                      background: "#43AFFF33",
                      float: "right",
                      textTransform: "capitalize"
                    }}
                    onClick={() => {
                      this.handleOpen(job.id);
                    }}
                  >
                    View Applications
                  </Button>
                </div>
              ))}
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

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          maxWidth={"lg"}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Applicants for this job
            <Button style={{ float: "right" }} onClick={this.handleClose}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent dividers>
            <h5>total 35 participants</h5>
            <div className="application-container">
              <Grid
                style={{
                  border: "1px solid #303F6080",
                  padding: "14px",
                  borderRadius: "15px",
                  color: "#303F60",
                  background: "#FFFFFF",
                  marginBottom: "10px"
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="name">
                    <p>Y</p>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p style={{ color: "#303F60", fontWeight: "700" }}>
                      Yash KAlra
                    </p>
                    <p>Yash KAlra@088gmail</p>
                  </div>
                </div>
                <p style={{ fontWeight: "600" }}>Skills:</p>
                <p>hongi</p>
              </Grid>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default JobCard;

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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      error: "",
      modalData: [],
      token: localStorage.getItem("token"),
      anchorEl: false,
      page: 1,
      count: 1,
      modalPage: 1,
      modalCount: 0,
      jobId: false
    };
  }
  async componentDidMount() {
    let temp = localStorage.getItem("token");
    if (temp) {
      this.setState({ token: temp }, () => {
        this.callJob(
          "https://jobs-api.squareboat.info/api/v1/recruiters/jobs",
          this.state.page,
          "data",
          "count"
        );
      });
    } else {
      this.props.history.push("/");
    }
  }
  handleOpen = (param) => {
    this.callJob(
      "https://jobs-api.squareboat.info/api/v1/recruiters/jobs/" +
        param +
        "/candidates",
      this.state.modalPage,
      "modalData",
      "modalCount"
    );

    this.setState({ open: true, jobId: param });
  };

  handleClose = () => {
    this.setState({ open: false, jobId: false });
  };

  handlePagination() {
    this.setState(
      (prevState) => ({ page: prevState + 1 }),
      () => {
        this.callJob(
          "https://jobs-api.squareboat.info/api/v1/recruiters/jobs",
          this.state.page,
          "data",
          "count"
        );
      }
    );
  }
  handleModalPagination = () => {
    this.setState(
      (prevState) => ({ modalPage: prevState + 1 }),
      () => {
        this.callJob(
          "https://jobs-api.squareboat.info/api/v1/recruiters/jobs/" +
            this.state.jobId +
            "/candidates",
          this.state.modalPage,
          "modalData",
          "modalCount"
        );
      }
    );
  };

  callJob = async (url, page, state, count) => {
    await axios
      .get(url + "?page=" + page, {
        headers: {
          Authorization: this.state.token
        }
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true && res.data.hasOwnProperty("message")) {
        } else {
          console.log();
          let temp =
            res.data.data.metadata.count < 20
              ? 1
              : Math.ceil(res.data.data.metadata.count / 20);
          this.setState({
            [state]: res.data.data.data,
            [count]: temp
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // this.props.history.push("/");
      });
  };
  render() {
    return (
      <div className="job-container">
        {this.state.data.length > 0 ? (
          //Outer padding so that container can come inwards
          <div className="job-container">
            <div
              className="section-wrapper"
              style={{ backgroundColor: "transparent" }}
            >
              <div
                style={{
                  display: "inline-block",
                  color: "white"
                }}
              >
                <HomeOutlinedIcon
                  style={{ color: "white", fontSize: "17px" }}
                />
                <span style={{ marginLeft: "10px", fontSize: "17px" }}>
                  Home
                </span>
              </div>
              <h5
                style={{
                  color: "white",
                  fontWeight: 600,
                  margin: "20px 0px 20px 0px"
                }}
              >
                Job posted by you
              </h5>

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
            <center>
              <div className="pagination">
                <Pagination
                  count={this.state.count}
                  page={this.state.page}
                  onChange={this.handlePagination}
                  shape="rounded"
                />
              </div>
            </center>
          </div>
        ) : (
          <div className="no-post-container">
            <DescriptionOutlinedIcon
              color="disabled"
              style={{ fontSize: 80 }}
            />
            <p>Your posted jobs will show here!</p>
            <Button
              style={{ background: "#43AFFF", color: "white" }}
              onClick={() => this.props.history.push("/postJob")}
            >
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
          maxWidth={"xl"}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Applicants for this job
            <Button style={{ float: "right" }} onClick={this.handleClose}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent dividers>
            <h5>
              {this.state.modalCount
                ? "total " + this.state.modalCount + " participants"
                : "0 applications"}{" "}
            </h5>
            <div className="application-container">
              {this.state.modalData.length > 0 ? (
                this.state.modalData.map((data) => {
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
                          {data.name}
                        </p>
                        <p>{data.email}</p>
                      </div>
                    </div>
                    <p style={{ fontWeight: "600" }}>Skills:</p>
                    <p>{data.skills}</p>
                  </Grid>;
                })
              ) : (
                <div className="application-container no-post-container">
                  <DescriptionOutlinedIcon
                    style={{ fontSize: 80, color: "#303F60" }}
                  />
                  <p style={{ collot: "#303F60" }}>
                    No applications available!
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default JobCard;

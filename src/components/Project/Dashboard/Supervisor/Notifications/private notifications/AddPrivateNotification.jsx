import React, { Component } from "react";
import { URL } from "../../../../../../configs/index";

//import { URL } from "../configs/index";
//import { postNotification } from "../actions/index";
import axios from "axios";
import "../notif.css";

export default class AddPrivateNotification extends Component {
  state = {
    heading: "",
    Message: "",

    FCM_token: "",
    image_name: null,
    priority: "",
    active: "",
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlechange = (e) => {
    this.setState({ image_name: e.target.files[0] });
  };

  handelClick = async () => {
    // const data = new FormData();
    // data.append('files', this.state.image_name);
    // this.setState({ image_name: data });

    let formdata = new FormData();
    //formdata.append("data", this.state);
    formdata.append("heading", this.state.heading);
    formdata.append("Message", this.state.Message);
    formdata.append("FCM_token", this.state.FCM_token);
    formdata.append("priority", this.state.priority);
    formdata.append("image_name", this.state.image_name);
    formdata.append("active", this.state.active);

    console.log("state", this.state);
    console.log("formdata", formdata);

    //postNotification(this.state);

    await axios
      .post(URL + "privatenotification/add", formdata)
      .then((response) => {
        window.alert("Notification added successfully!");
      })
      .catch((err) => {
        if (err) {
          window.alert("Notification not added plese check your DB!");
          console.log(err);
        }
      });
  };

  render() {
    const { heading, Message, FCM_token, priority, active } = this.state;
    return (
      <>
        <div class="form-style-8">
          <div className="mb-3 mt-3">
            <span
              className="glyphicon glyphicon-chevron-left"
              onClick={() => {
                window.location = "/privatenotification";
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <span>
              <h2>Send Notification to a specific users</h2>
            </span>
          </div>
          {/* {/ <div className="form-label m-3"> <h2>Send Notification to single user</h2> </div> /} */}

          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Heading:</label>
            <input
              type="text"
              className="form-control m-3"
              name="heading"
              value={heading}
              onChange={this.changeHandler}
              placeholder="notification heading here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Message:</label>
            <input
              type="text"
              className="form-control"
              name="Message"
              value={Message}
              onChange={this.changeHandler}
              placeholder="notification Message here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter FCM TOKEN:</label>
            <input
              type="text"
              className="form-control"
              name="FCM_token"
              value={FCM_token}
              onChange={this.changeHandler}
              placeholder="notification FCM_token here"
            />
          </div>

          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Priority:</label>
            <input
              type="text"
              className="form-control"
              name="priority"
              value={priority}
              onChange={this.changeHandler}
              placeholder="enter priority here (1-3)"
            />
          </div>

          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Status:</label>
            <input
              type="text"
              className="form-control"
              name="active"
              value={active}
              onChange={this.changeHandler}
              placeholder="enter status of notification ( 0 for inactive 1 for active)"
            />
          </div>

          {/* <div className="mb-3">
                        <label className="form-label m-3">Enter FMC:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="FCM"
                            value={FCM}
                            onChange={this.changeHandler}
                            placeholder="FCM here"
                        />
                    </div> */}
          <div className="mb-3">
            <label className="form-label m-3">Select Image:</label>
            <input
              type="file"
              name="uploaded_image"
              onChange={this.handlechange}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary m-2 " onClick={this.handelClick}>
              Send Notification
            </button>
          </div>
        </div>
      </>
    );
  }
}

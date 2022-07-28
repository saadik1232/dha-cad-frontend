import React, { Component } from "react";
import axios from "axios";
import "../notif.css";
import { URL } from "../../../../../../configs/index";

export default class AddNotification extends Component {
  state = {
    heading: "",
    Message: "",

    topic: "",
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
    formdata.append("topic", this.state.topic);
    formdata.append("priority", this.state.priority);
    formdata.append("image_name", this.state.image_name);
    formdata.append("active", this.state.active);

    console.log("state", this.state);
    console.log("formdata", formdata);

    //postNotification(this.state);

    await axios
      .post(URL + "publicnotification/add", formdata)
      .then((response) => {
        window.alert("Notification added suuccessfully");
        console.log(response);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  render() {
    const { heading, Message, topic, priority, active } = this.state;
    return (
      <>
        <div class="form-style-8">
          <div className="mb-3 mt-3">
            <span
              className="glyphicon glyphicon-chevron-left"
              onClick={() => {
                window.location = "/publicnotification";
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <span>
              <h2>Send Notification to all users</h2>
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
            <label className="form-label m-3">Enter Topic:</label>
            <input
              type="text"
              className="form-control"
              name="topic"
              value={topic}
              onChange={this.changeHandler}
              placeholder="notification topic here"
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

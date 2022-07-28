import React, { Component } from "react";
import { postNotification } from "../../../../../../actions/index";
class Notification extends Component {
  state = {
    heading: "",
    Message: "",
    image: "",
    icon: "",
    FCM: "",
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handelClick = () => {
    postNotification(this.state);
  };
  render() {
    const { heading, Message, FCM, image, icon } = this.state;
    return (
      <>
        <div className="container">
          <div className="mb-3 mt-3">
            <span
              className="glyphicon glyphicon-chevron-left"
              onClick={() => {
                window.location = "/";
              }}
            />
          </div>
          <h1>Send Notification to single user</h1>

          <div className="mb-3 mt-3">
            <label className="form-label m-3">
              Enter Notification Heading:
            </label>
            <input
              type="text"
              className="form-control m-3"
              name="heading"
              value={heading}
              onChange={this.changeHandler}
              placeholder="notification title here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">
              Enter Notification Message:
            </label>
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
            <label className="form-label m-3">
              Enter Icon for Notification Message:
            </label>
            <input
              type="text"
              className="form-control"
              name="icon"
              value={icon}
              onChange={this.changeHandler}
              placeholder="icon for notification Message here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">
              Enter image for Notification Message:
            </label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={image}
              onChange={this.changeHandler}
              placeholder="image for notification Message here"
            />
          </div>
          <div className="mb-3">
            <label className="form-label m-3">Enter FMC:</label>
            <input
              type="text"
              className="form-control"
              name="FCM"
              value={FCM}
              onChange={this.changeHandler}
              placeholder="FCM here"
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

export default Notification;

import React, { Component } from "react";
class PublicNotification extends Component {
  state = {
    heading: "",
    Message: "",
    image_name: "",
    topic: "",
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handelfilechange = (e) => {
    this.setState({ image_name: e.target.files[0] });
  };
  handelClick = () => {
    //postNotification(this.state);
    console.log("I am clecked");
    console.log("heading from state", this.state.heading);
    console.log("Message from state", this.state.Message);
    console.log("topic from state", this.state.topic);
    console.log("Image from state", this.state.image_name);
  };
  render() {
    const { heading, Message, image_name, topic } = this.state;

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
          <h1>Send Notification to topic</h1>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Notification Title:</label>
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
              className="form-control m-3"
              name="Message"
              value={Message}
              onChange={this.changeHandler}
              placeholder="notification Message here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter topic:</label>
            <input
              type="text"
              className="form-control m-3"
              name="topic"
              value={topic}
              onChange={this.changeHandler}
              placeholder="notification topic here"
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label m-3">Enter Image:</label>
            <input
              type="file"
              className="form-control m-3"
              name="image_name"
              onChange={this.changeHandler}
              placeholder="notification topic here"
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

export default PublicNotification;

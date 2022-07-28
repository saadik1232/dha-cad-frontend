import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../../../configs/index";

class GetPublicNotification extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    await axios
      .post(URL + "publicnotification/getall")
      .then((response) => {
        this.setState({
          data: response.data.result.data,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }
  HandelDelete = (id, topic) => {
    axios
      .post(URL + "publicnotification/update", {
        id: id,
        topic: topic,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <div className="mb-3 mt-3">
          <span
            className="glyphicon glyphicon-chevron-left"
            onClick={() => {
              window.location = "/";
            }}
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ float: "right", margin: "3px" }}
          onClick={() => {
            window.location = "/addpublicnotifications";
          }}
        >
          Add Notification
        </button>
        <table className="table">
          <thead className="m-3">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Notification Message</th>
              <th scope="col">priority</th>
              <th scope="col">Topic</th>
              {/* <th scope="col">FCM Token</th> */}
              <th></th>
            </tr>
          </thead>
          {data.map((post) => {
            return (
              <tbody key={post.id}>
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.heading}</td>
                  <td>{post.Message}</td>
                  <td>{post.priority}</td>
                  <td>{post.topic}</td>
                  {/* <td>{post.FCM_token}</td> */}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.HandelDelete(post.id, post.topic)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default GetPublicNotification;

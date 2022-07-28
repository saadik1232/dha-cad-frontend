import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../../../configs/index";
class GetPrivateNotification extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    await axios
      .post(URL + "privatenotification/getall")
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
  HandelDelete = (id, FCM_token) => {
    axios
      .post(URL + "privatenotification/update", {
        id: id,
        FCM_token: FCM_token,
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
            window.location = "/AddPrivateNotification";
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
              <th scope="col">contact</th>
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
                  <td>{post.contact}</td>
                  {/* <td>{post.FCM_token}</td> */}
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.HandelDelete(post.id, post.FCM_token)}
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

export default GetPrivateNotification;

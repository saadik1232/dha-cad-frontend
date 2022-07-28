import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../../../configs/index";
class GetUserNotification extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    await axios
      .post(URL + "usernotification/getall")
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
        <table className="table">
          <thead className="m-3">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">start date</th>
              <th scope="col">end date</th>
              <th scope="col">User Name</th>
              <th scope="col">User Address</th>
              {/* <th></th> */}
            </tr>
          </thead>
          {data.map((post) => {
            return (
              <tbody key={post.id}>
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.start_date}</td>
                  <td>{post.end_date}</td>
                  <td>{post.user_name}</td>
                  <td>{post.user_address}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default GetUserNotification;

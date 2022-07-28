import React, { useEffect } from "react";

const Profile = (props) => {
  var user = props.user;

  var info = "placeholder.png";

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div
            style={{
              textAlign: "center",
              padding: "0px 30px",
              borderRight: "1px solid #999",
            }}
          >
            <center>
              <img
                // src="placeholder.png"
                src={user.image || info}
                className="img-responsive"
                alt=""
                style={{ borderRadius: "200px", width: "200px" }}
              />
            </center>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <p>
            <b> First Name: </b>
            {user.firstname}
          </p>
          <p>
            <b> Last Name: </b>
            {user.lastname}
          </p>
          <p>
            <b> Contact: </b>
            {user.contact}
          </p>
          <p>
            <b> Cnic: </b>
            {user.cnic}
          </p>
          <p>
            <b> Email: </b>
            {user.email}
          </p>
          <p>
            <b> Password: </b>
            {user.password}
          </p>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <p>
            <b> City: </b>
            {user.city}
          </p>
          <p>
            <b> Town: </b>
            {user.town}
          </p>
          <p>
            <b> Street: </b>
            {user.street}
          </p>
          <p>
            <b> House: </b>
            {user.house}
          </p>
          <p>
            <b> Latitude: </b>
            {user.lat}
          </p>
          <p>
            <b> Longitude: </b>
            {user.lng}
          </p>
        </div>
        <div style={{ padding: "20px" }}>
          <button
            className="btn btn-primary pull-right"
            data-toggle="modal"
            data-target="#profileEdit"
            data-dismiss="modal"
          >
            <span>
              <i className="fa fa-pencil"></i>
              &nbsp;
            </span>{" "}
            Update{" "}
          </button>
          <div className="clearfix"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;

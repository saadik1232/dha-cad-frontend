import React from "react";

const Admin = props => {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Admin</h1>
        <div>
          <br />
          <br />
        </div>
        <button
          className="btn btn-primary pull-right"
          onClick={() => props.logout()}
        >
          <i className="fa fa-sign-out"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Admin;

import React from "react";

const NotFound = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <br />
        <br />
        <div className="jumbotron">
          <h1> 404 - Page Not Found ! </h1>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;

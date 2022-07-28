import React from "react";

const PageCenter = (props) => {
  return (
    <>
      <div className="container">
        <div style={{ marginTop: "70px" }}></div>
        <div className="row">
          <div className="col-lg-4 col-md-3 col-sm-3 col-xs-12"></div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            {props.children}
          </div>
          <div className="col-lg-4 col-md-3 col-sm-3 col-xs-12"></div>
        </div>
      </div>
    </>
  );
};

export default PageCenter;

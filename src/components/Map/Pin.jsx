import React from "react";
import { useState } from "react";

const Pin = props => {
  return (
    <React.Fragment>
      <img
        src={props.pin}
        alt="Marker Pin Icon"
        style={{ width: "40px" }}
        onClick={() => {
          props.setPop(true);
        }}
      />
    </React.Fragment>
  );
};

export default Pin;

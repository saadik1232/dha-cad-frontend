import React from "react";

const Msg = (props) => {
  return (
    <>
      <div
        style={{
          background: "#369",
          color: "#fff",
          display: "inline",
          margin: "10px",
          padding: "10px",
          borderRadius: "100px",
          float: props.direction || "left",
        }}
      >
        {props.text || ""}
      </div>
      <div className="clearfix"></div>
    </>
  );
};

export default Msg;

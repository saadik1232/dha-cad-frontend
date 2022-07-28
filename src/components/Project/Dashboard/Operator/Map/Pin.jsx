import React from "react";
import { useState } from "react";
import "./map.css";

const Pin = (props) => {
  const pop = () => {
    if (props.features.text || true) {
      return (
        <div
          style={{
            fontSize: "12px",
            padding: "5px",
            background: "#fff",
            marginTop: "-35px",
            fontWeight: "bold",
            // display: "inline",
            position: "absolute",
            // top: 0,
            // left: 0,
          }}
          className="text"
        >
          Hello world
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      <div style={{}}>
        <div style={{ display: "", position: "" }}>
          <div
            style={{
              display: "inline",
              border: "0px",
              width: "100px",
              height: "100px",
              borderRadius: "200px",
              // background: "#000",
              padding: "50px",
              boxShadow:
                "0px 0px 20px " +
                (props.features.shade || "transparent") +
                " inset",
            }}
            className={
              props.features.buzz == true || props.features.buzz == "true"
                ? "bloomer"
                : "inverse-bloomer"
            }
          >
            {props.features.showSpot || false ? (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "200px",
                  background: props.features.spot || "transparent",
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  // top: 0,
                  // left: 0,
                }}
              ></div>
            ) : null}
            <img
              src={props.pin}
              alt="Marker Pin Icon"
              style={{ width: "20px", opacity: 1 }}
              onClick={() => {
                props.setPop(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* {pop()} */}
    </React.Fragment>
  );
};

export default Pin;

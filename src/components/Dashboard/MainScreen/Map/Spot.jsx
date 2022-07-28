import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";

const Spot = (props) => {
  const myPop = (
    // <Popup
    //   latitude={props.lat}
    //   longitude={props.lng}
    //   onClose={() => {
    //     if (props.caller)
    //       props.caller(() => {
    //         setPop(false);
    //       });
    //     else setPop(false);
    //   }}
    //   style={{ padding: 0, margin: 0 }}
    // >
    //   <div> {props.content || null} </div>
    // </Popup>
    <div
      className=""
      style={{
        backgroundColor: "#fff",
        minWidth: 200,
        padding: 10,
        position: "absolute",
        top: 50,
        left: 0,
        lineHeight: "5px",
      }}
    >
      <span style={{ zIndex: 1000000 }}>
        <span className="pull-right" onClick={() => setPop(false)}>
          <i className="fa fa-remove"></i>
        </span>
        <div className="clearfix"></div>
      </span>

      {props.content || null}
    </div>
  );
  const [pop, setPop] = useState(false);
  const getPop = () => {
    if (pop == true) {
      if (props.content == null) {
        return null;
      } else {
        return myPop;
      }
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      <Marker latitude={props.lat} longitude={props.lng}>
        {getPop()}
        <Pin setPop={setPop} pin={props.pin} />
      </Marker>
    </React.Fragment>
  );
};

export default Spot;

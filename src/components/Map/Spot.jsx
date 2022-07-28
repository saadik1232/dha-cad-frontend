import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";

const Spot = props => {
  const myPop = (
    <Popup
      latitude={props.lat}
      longitude={props.lng}
      onClose={() => setPop(false)}
      style={{ padding: 0, margin: 0 }}
    >
      <b>{props.heading || null}</b>
      <p>{props.body || null}</p>
    </Popup>
  );
  const [pop, setPop] = useState(false);
  const getPop = () => {
    if (pop == true) {
      if (props.heading == null && props.body == null) {
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
        <Pin setPop={setPop} pin={props.pin} />
      </Marker>
      {getPop()}
    </React.Fragment>
  );
};

export default Spot;

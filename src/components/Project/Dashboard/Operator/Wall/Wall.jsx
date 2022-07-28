import React from "react";
import Map from "./../Map/Map1";
import StatusBar from "../StatusBar/StatusBar";

const Wall = (props) => {
  return (
    <>
      {/* <img
        src="https://highthemes.com/wp-content/uploads/2017/12/google-map.png"
        alt=""
        style={{ width: "100%", height: "100vh" }}
      /> */}
      <StatusBar />
      <Map
        // type={1}
        latitude={31}
        longitude={74}
        width={"100%"}
        height={"100vh"}
        zoom={9}
      />
    </>
  );
};

export default Wall;

import React from "react";
import Map from "../../../Map/Map";

const SupervisorMap = (props) => {
  return (
    <React.Fragment>
      <Map
        type={0}
        lat={props.lat || 31.4676}
        lng={props.lng || 74.3209}
        zoom={10.7}
        pins={[
          {
            icon: require("./../../../../pins/5.png"),
            content: (data) => {
              return (
                <div style={{ lineHeight: "5px" }}>
                  <br />
                  <br />
                  <p>
                    <b> Name : </b> {data.firstname || ""}
                    &nbsp;
                    {data.lastname || ""}
                  </p>
                  <p>
                    <b> Contact : </b> {data.contact || ""}
                  </p>
                </div>
              );
            },
            data: props.free,
          },
          {
            icon: require("./../../../../pins/9.png"),
            content: (data) => {
              return (
                <div style={{ lineHeight: "5px" }}>
                  <br />
                  <br />
                  <p>
                    <b> Contact : </b> {data.contact || ""}
                  </p>
                  <p>
                    <b> Address : </b> {data.address || ""}
                  </p>
                  <p>
                    <button className="btn btn-primary btn-block btn-xs">
                      <span>
                        <i className="fa fa-check"></i> &nbsp;
                      </span>
                      Confirm
                    </button>
                  </p>
                </div>
              );
            },
            data: props.panic,
          },
          {
            icon: require("./../../../../pins/12.png"),
            content: (data) => {
              return (
                <div style={{ lineHeight: "5px" }}>
                  <br />
                  <br />
                  <p>
                    <b> Name : </b> {data.firstname || ""}
                    &nbsp;
                    {data.lastname || ""}
                  </p>
                  <p>
                    <b> Contact : </b> {data.contact || ""}
                  </p>
                </div>
              );
            },
            data: props.buzy,
          },
        ]}
      />
    </React.Fragment>
  );
};

export default SupervisorMap;

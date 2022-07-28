import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  FetchAllGeofences,
  AddGeofences,
} from "./../../../../../../actions/index";

import MapGL, {
  Marker,
  FullscreenControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
// import "./style.css";
import "./../style.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
  const [data, setData] = useState([]);
  const [map, setMap] = useState(false);
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const init = async () => {
    // await props.fetchAllGeofences();
  };

  // useEffect(() => {
  //   init();
  //   // let coords;
  //   // coords = props.traccarGeofences.map((item) => item.coords);
  //   let struct = {
  //     type: "FeatureCollection",
  //     features: [...props.traccarGeofences],
  //   };
  //   setData(struct);
  //   return;
  // }, [props.traccarGeofences]);

  useEffect(() => {
    if (service != "" && name != "") {
      setMap(true);
    } else {
      setMap(false);
    }
  }, [service, name]);

  let MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiemFlZW10YXJyYXIzIiwiYSI6ImNrODF6N21kZDAxa2kzb255c3I4bnh5NWsifQ.CqUWmnyMb0nGVwAQYF0d6w";
  let mapStyle = "mapbox://styles/mapbox/streets-v9";

  const getMap = () => {
    if (map) {
      return (
        <MapGL
          initialState={{
            data: {
              type: "FeatureCollection",
              features: [],
            },
          }}
          style={{ width: "100%", height: "500px" }}
          mapStyle={mapStyle}
          accessToken={MAPBOX_ACCESS_TOKEN}
          latitude={props.lat || 31.4676}
          longitude={props.lng || 74.3209}
          zoom={props.zoom || 10}
        >
          <Draw
            //   onDrawCreate={({ features }) => setFts(features)}
            //   onDrawUpdate={({ features }) => setFts(features)}
            data={{
              type: "FeatureCollection",
              features: [],
            }}
            onDrawSelectionChange={(data) => {
              alert("Selected : " + data.features[0].id);
            }}
            onDrawDelete={async (data) => {
              // var id = data.features[0].id;
              // await deleteGeofences("admin", "L@s3rjet9045", id, async (data) => {
              //   // alert("Deleted !");
              //   await fetchPoints();
              //   status = "del";
              // });
            }}
            onDrawCreate={async (d) => {
              var limit = d.features.length;
              if (limit - 1 == 0) {
                limit = 0;
              } else {
                limit = limit - 1;
              }
              var last = d.features[limit].geometry.coordinates[0];
              // console.error(last);
              alert(JSON.stringify({ data: last, limit }));
              //props.reset();
              await props.addGeofences(service, name, last);
              await props.fetchAllGeofences();
              setService("");
              setName("");
            }}
            onDrawUpdate={(d) => {
              var id = d.features[0].id;
              // if (service != 0) {
              var limit = d.features.length;
              if (limit - 1 == 0) {
                limit = 0;
              } else {
                limit = limit - 1;
              }
              var last = d.features[limit].geometry.coordinates[0];
              alert(last);
              // console.error(last);
              // alert(JSON.stringify({ data: last, limit }));
              //props.reset();
              // updateGeofences(
              //   id,
              //   "admin",
              //   "L@s3rjet9045",
              //   service,
              //   name,
              //   last,
              //   async () => {
              //     // alert(JSON.stringify(last));
              //     await fetchPoints();
              //     status = "add";
              //     setService(0);
              //     setMapShow(false);
              //   }
              // );
              // }
            }}
            onChange={(d) => {}}
          />
          {/* {props.children} */}
          <div className="nav">
            <NavigationControl />
          </div>
          <div className="fullscreen">
            <FullscreenControl />
          </div>
        </MapGL>
      );
    } else {
      return null;
    }
  };

  const fetchServices = () => {
    return props.services.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <option value={item.id}> {item.name} </option>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder=" Enter Name "
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <select
          className="form-control"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value=""> None </option>
          {fetchServices()}
        </select>
        <br />
      </div>
      {getMap()}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  traccarGeofences: state.traccarGeofences,
  services: state.services,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  fetchAllGeofences: () => FetchAllGeofences(dispatch),
  addGeofences: (id, name, coords) => AddGeofences(dispatch, id, name, coords),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

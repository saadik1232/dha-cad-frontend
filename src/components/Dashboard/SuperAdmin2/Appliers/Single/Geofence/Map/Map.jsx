import React, { useState, useEffect } from "react";
// import { Marker } from "react-map-gl";
import MapGL, {
  Marker,
  FullscreenControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "./style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  addGeofences,
  fetchAllGeofence,
  deleteGeofences,
  updateGeofences,
} from "./../../../../../../../requests/Traccar/Geofence/Geofence";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { getServices } from "./../../../../../../../requests/Service/Service";

// initialState = {
//   features: [],
// };

export default function Map(props) {
  var MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiemFlZW10YXJyYXIzIiwiYSI6ImNrODF6N21kZDAxa2kzb255c3I4bnh5NWsifQ.CqUWmnyMb0nGVwAQYF0d6w";
  const [fts, setFts] = useState([]);
  const [mapShow, setMapShow] = useState(false);
  var mapStyle = "mapbox://styles/mapbox/streets-v9";
  //   var mapStyle = "mapbox://styles/mapbox/light-v9";

  useEffect(() => {
    console.log("Data: ", props.data);
  }, [props.data]);

  const fetchPoints = () => {
    fetchAllGeofence("admin", "L@s3rjet9045", async (data) => {
      console.error("Data: ", data);
      var list = props.fetchPolygon(data);
      console.error("List: ", list);
      var struct = { type: "FeatureCollection", features: [...list] };
      console.error("Struct: ", struct);
      var struct2 = struct.features.filter((f) => f.id == props.id);
      struct.features = struct2;
      await props.setData(struct);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPoints();
      setMapShow(true);
    }, 2000);
  }, []);

  const [coord, setCoord] = useState([]);
  var status = "add";

  return (
    <React.Fragment>
      {mapShow == true ? (
        <MapGL
          initialState={{ data: props.data }}
          style={{ width: "100%", height: "500px" }}
          mapStyle={mapStyle}
          accessToken={MAPBOX_ACCESS_TOKEN}
          latitude={props.lat || 31.4676}
          longitude={props.lng || 74.3209}
          zoom={props.zoom || 11}
        >
          <Draw
            //   onDrawCreate={({ features }) => setFts(features)}
            //   onDrawUpdate={({ features }) => setFts(features)}
            data={props.data}
          />
          {props.children}
          {/* <div className="nav">
            <NavigationControl />
          </div> */}
          <div className="fullscreen">
            <FullscreenControl />
          </div>
        </MapGL>
      ) : null}
    </React.Fragment>
  );
}

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
} from "./../../../../../requests/Traccar/Geofence/Geofence";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { getServices } from "./../../../../../requests/Service/Service";

// initialState = {
//   features: [],
// };

export default function Map(props) {
  var MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiemFlZW10YXJyYXIzIiwiYSI6ImNrODF6N21kZDAxa2kzb255c3I4bnh5NWsifQ.CqUWmnyMb0nGVwAQYF0d6w";
  const [fts, setFts] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState(0);
  const [mapShow, setMapShow] = useState(false);
  //   const [data, setData] = useState({
  // type: "FeatureCollection",
  // features: [
  //     {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         coordinates: [31.4676, 74.3209],
  //         type: "Point",
  //       },
  //     },
  // ],
  //   });
  var mapStyle = "mapbox://styles/mapbox/streets-v9";
  //   var mapStyle = "mapbox://styles/mapbox/light-v9";

  useEffect(() => {
    if (service == 0) {
      setMapShow(false);
    } else {
      setMapShow(true);
    }
  }, [service]);

  /**
   * Fetching the Existing Service Providers
   */
  useEffect(() => {
    getServices((data) => {
      setServices(data);
    });
  }, []);

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
      await props.setData(struct);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPoints();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchAllGeofence("admin", "L@s3rjet9045", (data) => {
  //       console.error("Data: ", data);
  //       var list = props.fetchPolygon(data);
  //       console.error("List: ", list);
  //       var struct = { type: "FeatureCollection", features: [...list] };
  //       console.error("Struct: ", struct);
  //       setData(struct);
  //     });
  //   }, 3000);
  // }, []);

  const [coord, setCoord] = useState([]);
  var status = "add";

  const fetchServices = () => {
    return services.map((s) => {
      return (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      );
    });
  };

  return (
    <React.Fragment>
      <div>
        <select
          value={service}
          className="form-control"
          onChange={(e) => {
            setService(e.target.value);
          }}
        >
          <option value={0}> None </option>
          {fetchServices()}
        </select>
        <br />
      </div>
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
            onDrawSelectionChange={(data) => {
              // alert("Selected : " + data.features[0].id);
            }}
            onDrawDelete={async (data) => {
              var id = data.features[0].id;
              await deleteGeofences(
                "admin",
                "L@s3rjet9045",
                id,
                async (data) => {
                  // alert("Deleted !");
                  await fetchPoints();
                  status = "del";
                }
              );
            }}
            onDrawCreate={(d) => {
              if (service != 0) {
                var limit = d.features.length;
                if (limit - 1 == 0) {
                  limit = 0;
                } else {
                  limit = limit - 1;
                }
                var last = d.features[limit].geometry.coordinates[0];
                // console.error(last);
                // alert(JSON.stringify({ data: last, limit }));
                //props.reset();
                addGeofences(
                  "admin",
                  "L@s3rjet9045",
                  service,
                  last,
                  async () => {
                    // alert(JSON.stringify(last));
                    await fetchPoints();
                    status = "add";
                    setService(0);
                  }
                );
              }
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
              // alert(last);
              //   // console.error(last);
              //   // alert(JSON.stringify({ data: last, limit }));
              //   //props.reset();
              updateGeofences(
                id,
                "admin",
                "L@s3rjet9045",
                service,
                last,
                async () => {
                  // alert(JSON.stringify(last));
                  await fetchPoints();
                  status = "add";
                  setService(0);
                }
              );
              // }
            }}
            onChange={(d) => {}}
          />
          {props.children}
          <div className="nav">
            <NavigationControl />
          </div>
          <div className="fullscreen">
            <FullscreenControl />
          </div>
        </MapGL>
      ) : null}
    </React.Fragment>
  );
}

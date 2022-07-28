import React, { useState } from "react";
import Map from "./Map/Map";
// import { Marker } from "react-map-gl";
import MapGL, {
  Marker,
  FullscreenControl,
  NavigationControl,
} from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import { fetchAllGeofence } from "./../../../../../../requests/Traccar/Geofence/Geofence";
import { useEffect } from "react";

export default function Geofence(props) {
  const defaulter = {
    type: "FeatureCollection",
    features: [],
  };
  const [data, setData] = useState(defaulter);

  const polygonString = (data) => {
    var part1 = data.split("POLYGON((");
    var part2 = part1[1].split("))");
    var part3 = part2[0];
    var part4 = part3.split(", ");
    var part5 = [];
    for (let index = 0; index < part4.length; index++) {
      const element = part4[index];
      var part6 = element.split(" ");
      part5.push([Number(part6[0]), Number(part6[1])]);
    }
    return part5;
  };

  const fetchPolygon = (data) => {
    var info = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      var detail = {
        id: element.id,
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [polygonString(element.area)],
          type: "Polygon",
        },
      };
      info.push(detail);
    }
    return info;
  };

  useEffect(() => {
    console.error("Error Updated: ", data);
  }, [data]);

  const reset = () => {
    setData(defaulter);
  };

  return (
    <React.Fragment>
      <Map
        lat={31.4676}
        lng={74.3209}
        zoom={11}
        data={data}
        setData={setData}
        reset={reset}
        fetchPolygon={fetchPolygon}
        id={props.id}
      >
        <Marker latitude={31.4676} longitude={31.4676}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={
              "https://lh3.googleusercontent.com/proxy/OHZQudCBfwux4u0lw2aYsjTr80rtMs14NL0eTOT5_H9lYp9E1UN73noe7Bgn08OvotQr6Ch0dGoC-yU8LUNSnw4dVW575-44dD2pvWDC4CAYEjai6w1sC9pwlqWOfyHNBgi6EpieBW8"
            }
          />
          <h1 style={{ backgroundColor: "red" }}> Hello wolrd </h1>
        </Marker>
      </Map>
    </React.Fragment>
  );
}

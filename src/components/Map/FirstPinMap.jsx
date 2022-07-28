import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Spot from "./Spot";
import axios from "axios";
import { URL } from "../../config/config";

const Map = (props) => {
  const KEY =
    "pk.eyJ1IjoiemFlZW10YXJyYXIzIiwiYSI6ImNrODF6N21kZDAxa2kzb255c3I4bnh5NWsifQ.CqUWmnyMb0nGVwAQYF0d6w";
  var mapType = "";
  switch (props.type) {
    case 1:
      {
        mapType = "mapbox://styles/zaeemtarrar3/ck824k9kf2i9t1iofd77sbalm";
      }
      break;
    case 2:
      {
        mapType = "mapbox://styles/zaeemtarrar3/ck81zu7cs2dp91iof46988lga";
      }
      break;
    default: {
      mapType = "mapbox://styles/zaeemtarrar3/ck81zu7cs2dp91iof46988lga";
    }
  }
  // const [lat, setLat] = useState(props.lat);
  // const [lng, setLng] = useState(props.lng);
  const [viewport, setViewport] = useState({
    latitude: props.lat || 31,
    longitude: props.lng || 74,
    width: props.width || "100vw",
    height: props.height || "100vh",
    zoom: props.zoom || 10,
  });

  const center = async (data) => {
    var lists = [];
    for (let i = 0; i < data.length; i++) {
      await lists.push({
        latitude: Number(data[i].lat),
        longitude: Number(data[i].lng),
      });
    }
    if (lists.length > 0) {
      console.log("Access: ", lists);
      var url = URL + "/panics/getCenter";
      axios
        .post(url, { data: lists })
        .then((response) => {
          var info = response.data.result.data;
          console.log("Access2: ", info);
          setViewport({
            latitude: info.latitude,
            longitude: info.longitude,
            width: viewport.width,
            height: viewport.height,
            zoom: viewport.zoom,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const getSpots = (data, pin = "/images/pin.png") => {
    return data.map((l) => {
      return (
        <Spot
          key={l.id}
          pin={l.pin || pin}
          lat={l.lat}
          lng={l.lng}
          heading={l.heading || null}
          body={l.body || null}
        />
      );
    });
  };
  useEffect(() => {
    setInterval(() => {
      props.getPoints((data) => {
        if (data.length > list.length) {
          console.log("Data1:", data);
          setList([...data]);
          // center(data);
          if (props.getPoints2 != null) {
            console.log("in");
            props.getPoints2((data2) => {
              if (data2.length > list2.length) {
                console.log("Data2: ", data2);
                setList2([...data2]);
                var centers = [...data, ...data2];
                centers = centers.filter((c) => c.lat != 0 && c.long != 0);
                console.log("Centers: ", centers);
                center(centers);
              }
            });
          } else {
            center(data);
          }
        }
      });
    }, 1000);
  }, ["text"]);

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        // latitude={lat}
        // longitude={lng}
        mapboxApiAccessToken={KEY}
        mapStyle={mapType}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {getSpots([...list.slice(0, 1)], "/images/pin.png")}
        {getSpots([...list.slice(1)], "/images/pin3.png")}
        {getSpots(list2, "/images/pin2.png")}
      </ReactMapGL>
    </React.Fragment>
  );
};

export default Map;

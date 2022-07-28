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

  const IncreaseZoom = async () => {
    if (viewport.zoom < 30) {
      await setViewport({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        width: viewport.width,
        height: viewport.height,
        zoom: viewport.zoom + 1,
      });
    }
  };

  const DeccreaseZoom = async () => {
    if (viewport.zoom > 5) {
      await setViewport({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        width: viewport.width,
        height: viewport.height,
        zoom: viewport.zoom - 1,
      });
    }
  };

  var zoomer = false;
  const center = async (data) => {
    if (zoomer == false) {
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
          .then(async (response) => {
            var info = response.data.result.data;
            console.log("Access2: ", info);
            await setViewport({
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
      zoomer = true;
    }
  };

  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [list4, setList4] = useState([]);
  const [list5, setList5] = useState([]);
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
  const goPoint = async (pointer, set, list, data2 = null, cb = null) => {
    if (pointer != null) {
      await pointer(async (data) => {
        if (data.length > list.length) {
          await set([...data]);
          var centers = [];
          if (data2 == null) {
            centers = [...data];
          } else {
            centers = [...data, ...data2];
          }
          await center(centers);
          if (cb != null) {
            centers = centers.filter((c) => c.lat != 0 && c.long != 0);
            cb(centers);
          } else {
          }
        } else {
          var centers = [...data];
          await center(centers);
          if (cb != null) {
            centers = centers.filter((c) => c.lat != 0 && c.long != 0);
            cb(centers);
          } else {
          }
        }
      });
    } else {
      if (data2 != null && data2.length > 0) {
        var centers = [...data2];
        await center(centers);
        if (cb != null) {
          centers = centers.filter((c) => c.lat != 0 && c.long != 0);
          cb(centers);
        } else {
        }
      } else {
        var centers = [];
        await center(centers);
        if (cb != null) {
          centers = centers.filter((c) => c.lat != 0 && c.long != 0);
          cb(centers);
        } else {
        }
      }
    }
  };
  useEffect(() => {
    setInterval(async () => {
      if (props.getPoints != null) {
        await goPoint(props.getPoints, setList, list, null, async (r) => {
          console.log("Round 1: ", r);
          if (props.getPoints2 != null) {
            await goPoint(props.getPoints2, setList2, list2, r, async (r2) => {
              console.log("Round 2: ", r2);
              if (props.getPoints3 != null) {
                await goPoint(props.getPoints3, setList3, list3, r2, null);
              }
            });
          }
        });
      } else if (props.getPoints2 != null) {
        goPoint(props.getPoints2, setList2, list2, null, null);
      } else if (props.getPoints3 != null) {
        goPoint(props.getPoints3, setList3, list3, null, null);
      }
    }, 1000);
  }, ["text"]);

  return (
    <React.Fragment>
      <div>
        <div style={{ position: "absolute", top: 50, right: 10, zIndex: 10 }}>
          <button
            className="btn btn-default sharp-border"
            onClick={() => {
              IncreaseZoom();
            }}
          >
            +
          </button>
          <button
            className="btn btn-default sharp-border"
            onClick={() => {
              DeccreaseZoom();
            }}
          >
            -
          </button>
        </div>
        <ReactMapGL
          {...viewport}
          // latitude={lat}
          // longitude={lng}
          mapboxApiAccessToken={KEY}
          mapStyle={mapType}
          onViewportChange={async (viewport) => {
            await setViewport(viewport);
          }}
        >
          {getSpots(list, "/images/pin.png")}
          {getSpots(list2, "/images/pin2.png")}
          {getSpots(list3, "/images/pin3.png")}
        </ReactMapGL>
      </div>
    </React.Fragment>
  );
};

export default Map;

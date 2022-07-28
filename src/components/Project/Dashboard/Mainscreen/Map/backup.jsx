import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Spot from "./Spot";
import axios from "axios";

const Map = props => {
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
  const [viewport, setViewport] = useState({
    latitude: props.lat || "30",
    longitude: props.lng || "74",
    width: props.width || "100vw",
    height: props.height || "100vh",
    zoom: props.zoom || 10
  });

  const getPanics = async cb => {
    var url = "http://192.168.100.2:3004/panics";
    await axios
      .get(url)
      .then(response => {
        cb(response.data.result.data);
      })
      .catch(err => {
        console.log("Panic API Error !");
      });
  };

  const [spots, setSpots] = useState([]);
  //   useEffect(() => {
  //     getPanics(data => {
  //       setSpots(data);
  //     });
  //   }, ["text"]);
  const getSpots = async (data, cb) => {
    // return data.map(l => {
    //   return (
    //     <Spot
    //       key={l.id}
    //       lat={l.lat}
    //       lng={l.long}
    //       heading={l.heading || null}
    //       body={l.body || null}
    //     />
    //   );
    // });
    var info = [];
    for (let i = 0; i < data.length; i++) {
      //   console.log(data[i]);
      var html = <Spot key={data[i].id} lat={data[i].lat} lng={data[i].lng} />;
      await info.push(html);
    }
    console.log("Info: ", info);
    cb(info);
  };

  const getSpots2 = () => {
    getSpots(props.list, data => {
      console.log("I: ", data);
      var newData = data.map(i => i);
      setSpots(newData);
    });
  };

  useEffect(() => {
    getSpots2();
  }, ["text"]);

  useEffect(() => {
    console.log("Res2: ", spots);
  }, [spots]);

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={KEY}
        mapStyle={mapType}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {/* {() => {
          spots.map(s => {
            return s;
          });
        }} */}
      </ReactMapGL>
    </React.Fragment>
  );
};

export default Map;

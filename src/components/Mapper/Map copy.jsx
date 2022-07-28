import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import { Editor, DrawPolygonMode } from "react-map-gl-draw";
import Spot from "./Spot";
import { getCenter } from "geolib";
import axios from "axios";
import { Url } from "./../../configs/configs";
import LatLngCollect from "./../../Helpers/LatLngCollect";

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
      mapType = "mapbox://styles/mapbox/streets-v9";
    }
  }
  mapType = "mapbox://styles/mapbox/streets-v9";

  const [viewport, setViewport] = useState({
    latitude: props.lat || 31,
    longitude: props.lng || 74,
    width: props.width || "100vw",
    height: props.height || "100vh",
    zoom: props.zoom || 10,
  });

  var CENTER = [];

  const [panic, setPanic] = useState([]);
  const [free, setFree] = useState([]);
  const [buzy, setBuzy] = useState([]);
  const [centers, setCenters] = useState([]);
  const [centers2, setCenters2] = useState([]);
  const [centers3, setCenters3] = useState([]);
  const [allCenters, setAllCenters] = useState([]);

  useEffect(async () => {
    await props.panic((data) => {
      console.log("Panics: ", data);
      if (data.length > 0) {
        setPanic([...data]);
        var coords = LatLngCollect(data);
        console.log("Coords: ", coords);
        setCenters(...coords);
      }
    });
    await props.free((data) => {
      console.log("Free Responders: ", data);
      if (data.length > 0) {
        setFree([...data]);
        var coords = LatLngCollect(data);
        console.log("Coords2: ", coords);
        setCenters2(...coords);
      }
    });
    await props.buzy((data) => {
      console.log("Buzy Responders: ", data);
      if (data.length > 0) {
        setBuzy([...data]);
        var coords = LatLngCollect(data);
        console.log("Coords3: ", coords);
        setCenters3(...coords);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Centers: ", centers);
    centerer();
  }, [centers]);

  useEffect(() => {
    console.log("Centers2: ", centers2);
    centerer();
  }, [centers2]);

  useEffect(() => {
    console.log("Centers: ", centers3);
    centerer();
  }, [centers3]);

  const centerer = async () => {
    var data = [];
    await data.push(centers);
    await data.push(centers2);
    await data.push(centers3);
    console.log("All: ", data);
    // await setAllCenters();
    CENTER = data;
  };

  useEffect(async () => {
    console.log("All: ", CENTER);
    // var singleCenter = await getCenter(allCenters);
    // console.log("All Centers: ", singleCenter);

    // setViewport({
    //   ...viewport,
    //   latitude: singleCenter.latitude,
    //   longitude: singleCenter.longitude,
    // });
  }, [CENTER]);

  useEffect(() => {
    console.log("Map: ", viewport);
  }, [viewport]);

  const getPanicPins = (pins, icon, content) => {
    return panic.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={require("./../../pins/8.png")}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={"Hello There "}
        />
      );
    });
  };

  const getFreePins = (pins, icon, content) => {
    return free.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={require("./../../pins/7.png")}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={"Hello There "}
        />
      );
    });
  };

  const getBuzyPins = (pins, icon, content) => {
    return buzy.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={require("./../../pins/6.png")}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={"Hello There "}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={KEY}
        mapStyle={mapType}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {getPanicPins()}
        {getFreePins()}
        {getBuzyPins()}
      </ReactMapGL>
    </React.Fragment>
  );
};

export default Map;

import React, { useState, useEffect } from "react";
import Map from "../Map/Map";
import Header from "./Header/Header";
import Event from "./Event/Event";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import Display from "./Display/Display";
import GoogleMaps from "../GoogleMaps";
import { URL } from "../../config/config";
// import Sound from "react-sound";

const Supervisor = (props) => {
  const timer = 2000;
  const [eventHide, setEventHide] = useState(true);
  const [displaysHide, setDisplaysHide] = useState(true);
  const [displaysHide2, setDisplaysHide2] = useState(true);
  const [assignments, setAssignments] = useState(null);
  const [notice, setNotice] = useState(false);
  const [lat, setLat] = useState(31);
  const [long, setLong] = useState(71);
  var audioEl = null;

  const getAssignments = async (data) => {
    var url = URL + "/panics/operatorAssignment";
    return await axios
      .post(url, data)
      .then(async (response) => {
        if (response.data) {
          // console.log(response.data);
          var r = response.data.result.data;
          return r;
        } else {
          return [];
        }
      })
      .catch((e) => {
        return [];
      });
  };

  const getPoints = async (cb) => {
    var url = URL + "/panics/operatorAssignment";
    await axios
      .post(url, { operator: 4, status: 2 })
      .then(async (response) => {
        if (response.data) {
          // console.log(response.data);
          var r = response.data.result.data;
          cb(getAsyncPoints(r));
        } else {
        }
      })
      .catch((e) => {});
  };
  const getAsyncPoints = (data) => {
    var forward = [];
    for (let i = 0; i < data.length; i++) {
      forward.push({
        id: data[i].id,
        lat: Number(data[i].lat),
        lng: Number(data[i].long),
        body: (
          <div>
            <b> Name: </b>
          </div>
        ),
      });
    }
    // console.log("Forward: ", forward);
    return forward;
  };

  useEffect(() => {
    // audioEl = document.getElementsByClassName("audio-element")[0];
    // if (audioEl != null) {
    //   audioEl.play();
    // }
    setInterval(() => {
      if (eventHide == true) {
        getAssignments({ operator: 4, status: 2 })
          .then((result) => {
            var r = result;
            if (r.length > 0) {
              setAssignments(r[0]);
              setEventHide(false);
              setNotice(true);
              // if (lat == 0 && long == 0) {
              //   setLat(r[0].lat);
              //   setLat(r[0].long);
              // }
              // console.log(r[0]);
            }
          })
          .catch((e) => {
            console.log("Error !");
          });
      } else {
        setNotice(false);
      }
    }, timer);
  }, ["text"]);
  useEffect(() => {
    getAssignments({ operator: 4, status: 2 });
  }, ["text"]);
  return (
    <React.Fragment>
      <Header
        eventHide={eventHide}
        setEventHide={setEventHide}
        displaysHide={displaysHide}
        displaysHide2={displaysHide2}
        setDisplaysHide={setDisplaysHide}
        setDisplaysHide2={setDisplaysHide2}
        notice={notice}
        logout={() => props.logout()}
      />
      <main>
        <Map
          lat={31.5204}
          lng={74.3587}
          zoom={12}
          width={"100%"}
          height={"100vh"}
          type={1}
          getPoints={getPoints}
        />
        {!eventHide ? (
          <Event
            event={assignments != null ? assignments : null}
            eventHide={eventHide}
            setEventHide={setEventHide}
            setDisplaysHide={setDisplaysHide}
            setLong={setLong}
            setLat={setLat}
            natures={props.natures}
            priorities={props.priorities}
          />
        ) : null}

        <Display
          displaysHide={displaysHide}
          displaysHide2={displaysHide2}
          setDisplaysHide={setDisplaysHide}
          natures={props.natures}
          priorities={props.priorities}
        />
      </main>
      <audio className="audio-element">
        <source src="assets/beeps/beep1.mp3"></source>
      </audio>
    </React.Fragment>
  );
};

export default Supervisor;

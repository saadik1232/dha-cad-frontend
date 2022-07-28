import React, { useState, useEffect } from "react";
import Map from "../Map/Map1";
import Header from "./Header/Header";
import Event from "./Event/Event";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import Display from "./Display/Display";
import GoogleMaps from "../GoogleMaps";
import { URL } from "../../config/config";
// import Sound from "react-sound";

const Operator = (props) => {
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
    // console.log(props.verify());
    await axios
      .post(url, { operator: props.verify().id, status: 2 })
      .then(async (response) => {
        if (response.data) {
          var r = response.data.result.data;
          console.log("RR: ", r);
          cb(getAsyncPoints(r));
        } else {
        }
      })
      .catch((e) => {});
  };
  const getPoints2 = async (cb) => {
    var url = URL + "/panics/operatorAssignment";
    await axios
      .post(url, { operator: props.verify().id, status: 3 })
      .then(async (response) => {
        if (response.data) {
          var r = response.data.result.data;
          console.log("R: ", r);
          cb(getAsyncPoints2(r));
        } else {
        }
      })
      .catch((e) => {});
  };
  const getAsyncPoints = (data) => {
    var forward = [];
    var count = 0;
    for (let i = 0; i < data.length; i++) {
      if (count == 0) {
        forward.push({
          id: data[i].id,
          pin: "/images/pin4.png",
          lat: Number(data[i].lat),
          lng: Number(data[i].long),
          body: (
            <div>
              <b> Name: </b>
            </div>
          ),
        });
      } else {
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
      count++;
    }
    // console.log("Forward: ", forward);
    return forward;
  };
  const getAsyncPoints2 = (data) => {
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
  const getUsers = async (cb) => {
    var url = URL + "/auth/users/all";
    axios
      .get(url)
      .then(async (response) => {
        var info = response.data.result.data;
        if (info.length > 0) {
          var info2 = [];
          console.log("Info: ", info);
          for (let i = 0; i < info.length; i++) {
            var x = info[i];
            if (x.role.id == 4) {
              await info2.push(x);
            }
          }
          cb(getUsersAsync(info2));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getUsersAsync = (users) => {
    var forward = [];
    for (let i = 0; i < users.length; i++) {
      forward.push({
        id: users[i].id,
        lat: Number(users[i].lat),
        lng: Number(users[i].long),
        body: (
          <div>
            <b> Name: </b>
            <p> {users[i].firstname + " " + users[i].lastname} </p>
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
        getAssignments({ operator: props.verify().id, status: 2 })
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
          zoom={11}
          width={"100%"}
          height={"100vh"}
          type={1}
          getPoints={getUsers}
          getPoints2={getPoints2}
          getPoints3={getPoints}
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

export default Operator;

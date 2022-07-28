import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import Header from "./Header/Header";
import Map from "../Map/Map1";
// import SimpleMap from "../SimpleMap";
// import GoogleMaps from "../GoogleMaps";
import { URL } from "../../config/config";
const beeper = require("beeper");

const MainScreen = (props) => {
  const timer = 2;
  // const [panics, setPanics] = useState([]);
  const [pl, setPl] = useState(0);
  const getOperator = async (id) => {
    console.log("Id: ", id);
    var url = URL + "/auth/users/operator/" + id;
    return await axios
      .get(url)
      .then((response) => {
        if (response.data) {
          return response.data.result.data;
        } else {
          console.log("Operator Error !");
          return null;
        }
      })
      .catch((e) => {
        console.log("Operator Error !");
        return null;
      });
  };
  const getNature = (id) => {
    var n = props.natures.filter((n) => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getPriority = (id) => {
    var n = props.priorities.filter((n) => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getStatus = (id) => {
    var n = props.statuses.filter((n) => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getPanics = async (cb) => {
    var url = URL + "/panics/operatorAll";
    var data = [];
    await axios
      .get(url)
      .then(async (response) => {
        if (response.data) {
          var info = response.data.result.data;
          if (info.length > pl) {
            await setPl(info.length);
            cb(getPanicsAsync(info));
          }
        }
      })
      .catch((e) => {
        console.log("Panic Error !");
      });
    return data;
  };
  const getPanicsAsync = (panicList) => {
    var forward = [];
    for (let i = 0; i < panicList.length; i++) {
      forward.push({
        id: panicList[i].id,
        lat: Number(panicList[i].lat),
        lng: Number(panicList[i].long),
        body: (
          <div>
            <b> Customer Contant: </b>
            <p> {panicList[i].contact} </p>
            <b> Operator: </b>
            <p>
              {panicList[i].operatorId.firstname +
                " " +
                panicList[i].operatorId.lastname}
            </p>
          </div>
        ),
      });
    }
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
  return (
    <React.Fragment>
      <Header logout={props.logout} />
      <main>
        <Map
          lat={31.5204}
          lng={74.3587}
          zoom={12}
          width={"100%"}
          height={"100vh"}
          type={1}
          getPoints={getPanics}
          getPoints2={getUsers}
        />
      </main>
    </React.Fragment>
  );
};

export default MainScreen;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import Header from "./Header/Header";
import Map from "../Map/Map";
import SimpleMap from "../SimpleMap";
import GoogleMaps from "../GoogleMaps";
import { URL } from "../../config/config";
const beeper = require("beeper");

const MainScreen = props => {
  const timer = 2;
  const [pancis, setPanics] = useState([]);
  // const [coords, setCoords] = useState([]);
  const [pl, setPl] = useState(0);
  const getOperator = async id => {
    console.log("Id: ", id);
    var url = URL + "/auth/users/operator/" + id;
    return await axios
      .get(url)
      .then(response => {
        if (response.data) {
          return response.data.result.data;
        } else {
          console.log("Operator Error !");
          return null;
        }
      })
      .catch(e => {
        console.log("Operator Error !");
        return null;
      });
  };
  const displayOperator = async id => {
    var op = null;
    await getOperator(id)
      .then(async data => {
        op = await data;
      })
      .catch(e => {
        console.log("Error !");
        op = null;
      });
    // console.log(op.firstname);
    return await op;
  };
  const getNature = id => {
    var n = props.natures.filter(n => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getPriority = id => {
    var n = props.priorities.filter(n => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getStatus = id => {
    var n = props.statuses.filter(n => n.id == id);
    if (n.length > 0) {
      return n[0];
    } else {
      return null;
    }
  };
  const getPanics = async () => {
    var url = URL + "/panics/operatorAll";
    await axios
      .get(url)
      .then(async response => {
        if (response.data) {
          var info = response.data.result.data;
          if (info.length > pl) {
            await setPl(info.length);
            // await beeper();
            // ToastsStore.success("You have a New Natice !");
            // info = await info.map(i => {
            //   getOperator(i.operatorId).then(data => {
            //     i.operatorId = data.firstname + " " + data.lastname;
            //   });
            //   return info;
            //   // getOperator(i.operatorId);
            // });

            console.log("Op: ", info);
            await setPanics([...info]);
            console.log(info.length, pl);
          }
        }
      })
      .catch(e => {
        console.log("Panic Error !");
      });
  };
  const displayPanics = () => {
    return pancis.reverse().map(p => {
      return (
        <li key={p.id} className="list-group-item sharp-border">
          <b> {p.id}. </b>
          &nbsp;&nbsp;
          {p.contact}
          <span
            className="badge sharp-border"
            style={{ background: "darkblue" }}
          >
            Long: {p.long}
          </span>
          <span className="badge sharp-border" style={{ background: "red" }}>
            Lat: {p.lat}
          </span>
          <hr />
          <div>
            &nbsp; &nbsp;
            <b>Addres: </b> {p.address}
          </div>
          <br />
          <span
            className="badge sharp-border pull-left"
            style={{ background: "purple", marginLeft: "5px" }}
          >
            Nature: &nbsp;
            {getNature(p.natureId) != null ? getNature(p.natureId).name : null}
          </span>
          <span
            className="badge sharp-border pull-left"
            style={{ background: "purple", marginLeft: "5px" }}
          >
            Priority: &nbsp;
            {getPriority(p.priorityId) != null
              ? getPriority(p.priorityId).name
              : null}
          </span>
          <span
            className="badge sharp-border pull-left"
            style={{ background: "purple", marginLeft: "0px" }}
          >
            Status: &nbsp;
            {getStatus(p.statusId) != null ? getStatus(p.statusId).name : null}
          </span>
          <span
            className="badge sharp-border pull-right"
            style={{ background: "green" }}
          >
            Operator: &nbsp;
            {p.operatorId.firstname + " " + p.operatorId.lastname}
          </span>
          <div className="clearfix"></div>
        </li>
      );
    });
  };

  const [myMap, setMyMap] = useState(null);
  const getMap = () => {
    return (
      <Map
        lat={31.5204}
        lng={74.3587}
        zoom={8}
        width={"100%"}
        height={"100vh"}
        type={1}
        list={pancis}
      />
    );
  };
  useEffect(() => {
    setInterval(() => {
      getPanics();
      setMyMap(getMap());
      console.log("Panics: ", pancis);
    }, timer * 1000);
  }, ["text"]);

  return (
    <React.Fragment>
      <Header logout={props.logout} />
      <main>{myMap}</main>

      {/* <div className="clearfix"></div>
      <div
        className="container"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <br />
        <br />
        <div className="">
          <div className="col-md-6">
            <div className="panel panel-primary sharp-border">
              <div className="panel-heading sharp-border">
                <i className="fa fa-warning"></i>
                &nbsp; Emergency Alarms Generated
              </div>
              <div
                className="panel-body sharp-border"
                style={{ maxHeight: "500px", overflow: "auto" }}
              >
                <ul className="list-group">{displayPanics()}</ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">Hello</div>
          <div className="col-md-6">Hello</div>
          <div className="col-md-6">Hello</div>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default MainScreen;

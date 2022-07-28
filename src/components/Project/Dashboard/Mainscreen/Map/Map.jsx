import React, { useState, useEffect, Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import { Editor, DrawPolygonMode } from "react-map-gl-draw";
import Spot from "./Spot";
import { getCenter } from "geolib";
import axios from "axios";
import { Url } from "./../../../../configs/configs";
import LatLngCollect from "./../../../../Helpers/LatLngCollect";
import { Beep1 } from "../../../../Beeper/Beeper";
import { getNatures } from "./../../../../requests/Nature/Nature";
import { getPriorities } from "./../../../../requests/Priority/Priority";
import { getUsers } from "./../../../../requests/User/User";
import { updatePanic } from "./../../../../requests/Panic/Panic";
import { ToastsStore } from "react-toasts";
import Assignment from "./Assignment";
import { getAllPanics } from "../../../../requests/Panic/Panic";
import {
  getAllLocations,
  getBuzyLocations,
  getFreeLocations,
  getAllLocationsFromTraccar,
} from "./../../../../requests/Responders/Responders";
// import { getUsers } from "./../../../../requests";
import _ from "lodash";
import Window from "../Window/Window";

class Map extends Component {
  state = {
    KEY:
      "pk.eyJ1IjoiemFlZW10YXJyYXIzIiwiYSI6ImNrODF6N21kZDAxa2kzb255c3I4bnh5NWsifQ.CqUWmnyMb0nGVwAQYF0d6w",
    mapType: "mapbox://styles/mapbox/streets-v9",
    viewport: {
      latitude: this.props.lat || 31,
      longitude: this.props.lng || 74,
      width: this.props.width || "100vw",
      height: this.props.height || "100vh",
      zoom: this.props.zoom || 12,
    },
    natures: [],
    priorities: [],
    user: JSON.parse(localStorage.getItem("user")),
    users: [],
    panic: [],
    free: [],
    buzy: [],
    centers: [],
    centers1: [],
    centers2: [],
    userType: this.props.userType,
    online: [],
    offline: [],
    unknown: [],
    logged: [],
    remark: "",
  };

  FU = async (panic) => {
    return await this.state.users.filter((f) => {
      return f.contact == panic.contact;
    });
  };

  confirmPanicAlert = async (id, opr, sup) => {
    await updatePanic(id, { statusId: 2 }, () => {
      ToastsStore.success("Panic Confirmed Successfully !");
    });
    // if (opr != null) {
    //   await updatePanic(id, { statusId: 2, operatorInvolved: opr }, () => {
    //     ToastsStore.success("Panic Confirmed Successfully !");
    //   });
    // } else if (sup != null) {
    //   await updatePanic(id, { statusId: 2, supervisorInvolved: sup }, () => {
    //     ToastsStore.success("Panic Confirmed Successfully !");
    //   });
    // } else {
    // }
  };

  assignPanicAlert = async (id, resp) => {
    // alert("Responder: " + resp);
    var resp2 = null;
    for (let i = 0; i < this.state.free.length; i++) {
      var element = this.state.free[i];
      if (element.id == resp) {
        resp2 = element.fcmToken;
        // alert(element.id);
      }
    }
    // alert(resp2);
    await updatePanic(
      id,
      { statusId: 3, responderInvolved: resp, fcm: resp2 },
      () => {
        ToastsStore.success("Panic Assigned to a Responder Successfully !");
      }
    );
  };

  responderResolvePanicAlert = async (id) => {
    await updatePanic(id, { statusId: 4 }, () => {
      ToastsStore.success("Panic Resolved by Responder Successfully !");
    });
  };

  operatorResolvePanicAlert = async (id) => {
    await updatePanic(
      id,
      { statusId: 5, operatorRemarks: this.state.remark },
      () => {
        ToastsStore.success("Panic Resolved by Operator Successfully !");
      }
    );
  };

  supervisorClosedPanicAlert = async (id) => {
    await Beep1();
    await updatePanic(
      id,
      { statusId: 6, supervisorClosingRemarks: this.state.remark },
      () => {
        ToastsStore.success("Panic Closed By Supervisor Successfully !");
      }
    );
  };

  init = async (cb = null) => {
    // console.error("Init");
    await getAllPanics((data) => {
      console.error("Panics: ", data);
      if (data.length > this.state.panic.length) {
        Beep1();
        this.centeralize();
      }
      this.setState({
        ...this.state,
        panic: data,
      });
    });
    // await getAllLocations((data) => {
    //   this.setState({
    //     ...this.state,
    //     free: data,
    //   });
    // });
    // await this.props.buzy((data) => {
    //   this.setState({
    //     ...this.state,
    //     buzy: data,
    //   });
    // });
    await cb();
  };

  initial = async () => {
    setInterval(async () => {
      // console.log("Running ...");
      await getNatures((data) => {
        this.setState({
          ...this.state,
          natures: data,
        });
      });
      await getPriorities((data) => {
        this.setState({
          ...this.state,
          priorities: data,
        });
      });
      await getUsers((data) => {
        this.setState({
          ...this.state,
          users: data,
        });
      });
      await this.init(() => {
        // console.log("Done");
      });
    }, 1000);
    setTimeout(async () => {
      await getAllLocationsFromTraccar(async (data) => {
        var db = [];
        await _.map(data, (r) => {
          if (r.db != null) {
            if (true || r.status == this.props.userType) {
              var info = r.db;
              if (r.position != null) {
                info.lat = r.position.latitude;
                info.lng = r.position.longitude;
              }
              info.name = r.name;
              info.status = r.status;
              db.push(info);
            }
          }
        });
        var online = db.filter((ff) => ff.status == "online");
        console.error("Online: ", db);
        var unknown = db.filter((ff) => ff.status == "unknown");
        var offline = db.filter((ff) => ff.status == "offline");
        this.setState({
          ...this.state,
          free: online,
          offline: offline,
          unknown: unknown,
        });
      });
      await this.centeralize();
    }, 4000);
  };

  componentDidMount() {
    this.initial();
  }

  panicHasResponder = (resId) => {
    var resp = this.state.panic.filter(
      (p) => p.responderInvolved == resId && p.statusId == 3
    );
    if (resp.length > 0) {
      return resp[0];
    } else return null;
  };

  filterResponders = () => {
    return this.state.users.filter((u) => u.roleId == 4);
  };

  filterPanic = (status) => {
    var data = this.state.panic.filter((p) => p.statusId == status);
    if (data.length > 0) return data;
    else return [];
  };

  filterNature = (id) => {
    var n = this.state.natures.filter((n) => n.id == id);
    if (n.length > 0) return n[0];
    else return null;
  };

  filterPriority = (id) => {
    var p = this.state.priorities.filter((p) => p.id == id);
    if (p.length > 0) return p[0];
    else return null;
  };

  filterUser = (id) => {
    var u = this.state.users.filter((u) => u.id == id);
    if (u.length > 0) return u[0];
    else return null;
  };

  centeralize = () => {
    var data = [
      ...this.state.panic,
      ...this.state.free,
      ...this.state.online,
      ...this.state.offline,
      ...this.state.unknown,
    ];
    var data2 = LatLngCollect(data);
    var data3 = getCenter(data2);
    this.setState({
      ...this.state,
      viewport: {
        ...this.state.viewport,
        latitude: data3.latitude,
        longitude: data3.longitude,
      },
    });
  };

  displayInQueryPanics = () => {
    var icon = require("./../../../../pins/13.png");
    var data = this.filterPanic(1);
    // console.error("Panics Upgraded Check !", data);
    return data.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          features={{
            shade: "red",
            spot: "green",
            showSpot: false,
            buzz: true,
          }}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Name: </b>
              </p>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {/* {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""} */}
                {p.address || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <div>
                <button
                  className="btn btn-primary btn-xs btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    this.confirmPanicAlert(p.id, 5); // Bilal
                  }}
                >
                  <span>
                    <i className="fa fa-check"></i>
                    &nbsp;
                  </span>
                  Confirm
                </button>
              </div>
            </div>
          }
        />
      );
    });
  };

  displayConfirmedPanics = () => {
    var icon = require("./../../../../pins/8.png");
    var data = this.filterPanic(2);
    return data.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          features={
            {
              // shade: "blue",
              // spot: "green",
              // showSpot: false,
              // buzz: false,
            }
          }
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <p>
                <b> Operator: </b>
                {this.filterUser(p.operatorInvolved) == null
                  ? null
                  : this.filterUser(p.operatorInvolved).firstname +
                    " " +
                    this.filterUser(p.operatorInvolved).lastname}
              </p>

              <Assignment
                item={p}
                displayAssignmentSelector={this.displayAssignmentSelector}
                assignPanicAlert={this.assignPanicAlert}
              />
            </div>
          }
        />
      );
    });
  };

  displayResponderAssignedPanics = () => {
    var data = this.filterPanic(3);
    return data.map((p) => {
      var icon = require("./../../../../pins/10.png");
      if (p.statusId == 3) {
        icon = require("./../../../../pins/10.png");
      } else {
        icon = require("./../../../../pins/19.png");
      }
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          features={{
            shade: "transparent",
            spot: "transparent",
            showSpot: false,
            buzz: false,
          }}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <p>
                <b> Operator: </b>
                {this.filterUser(p.operatorInvolved) == null
                  ? null
                  : this.filterUser(p.operatorInvolved).firstname +
                    " " +
                    this.filterUser(p.operatorInvolved).lastname}
              </p>
              <p>
                <b> Responder: </b>
                {this.filterUser(p.responderInvolved) == null
                  ? null
                  : this.filterUser(p.responderInvolved).firstname +
                    " " +
                    this.filterUser(p.responderInvolved).lastname}
              </p>
              {/* <div>
                <button
                  className="btn btn-primary btn-xs btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    this.responderResolvePanicAlert(p.id);
                  }}
                >
                  <span>
                    <i className="fa fa-check"></i>
                    &nbsp;
                  </span>
                  Assign
                </button>
              </div> */}
            </div>
          }
        />
      );
    });
  };

  displayResponderResolvedPanics = () => {
    var icon = require("./../../../../pins/15.png");
    var data = this.filterPanic(4);
    return data.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <p>
                <b> Operator: </b>
                {this.filterUser(p.operatorInvolved) == null
                  ? null
                  : this.filterUser(p.operatorInvolved).firstname +
                    " " +
                    this.filterUser(p.operatorInvolved).lastname}
              </p>
              <p>
                <b> Responder: </b>
                {this.filterUser(p.responderInvolved) == null
                  ? null
                  : this.filterUser(p.responderInvolved).firstname +
                    " " +
                    this.filterUser(p.responderInvolved).lastname}
              </p>
              <div>
                <div>
                  <input
                    placeholder="Enter Your Remarks"
                    className="form-control"
                    value={this.state.remark}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        remark: e.target.value,
                      });
                    }}
                  />
                </div>
                <br />
                <button
                  className="btn btn-success btn-xs btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.state.user.roleId == 3) {
                      this.operatorResolvePanicAlert(p.id);
                    } else {
                      this.supervisorClosedPanicAlert(p.id);
                    }
                  }}
                >
                  <span>
                    <i className="fa fa-check"></i>
                    &nbsp;
                  </span>
                  {this.state.user.roleId == 2
                    ? " Close Panic "
                    : " Resolve Panic "}
                </button>
              </div>
            </div>
          }
        />
      );
    });
  };

  displayOperatorResolvedPanics = () => {
    var icon = require("./../../../../pins/17.png");
    var data = this.filterPanic(5);
    return data.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <p>
                <b> Operator: </b>
                {this.filterUser(p.operatorInvolved) == null
                  ? null
                  : this.filterUser(p.operatorInvolved).firstname +
                    " " +
                    this.filterUser(p.operatorInvolved).lastname}
              </p>
              <p>
                <b> Responder: </b>
                {this.filterUser(p.responderInvolved) == null
                  ? null
                  : this.filterUser(p.responderInvolved).firstname +
                    " " +
                    this.filterUser(p.responderInvolved).lastname}
              </p>
              <div>
                <button
                  className="btn btn-success btn-xs btn-block"
                  onClick={(e) => {
                    e.preventDefault();
                    this.supervisorClosedPanicAlert(p.id);
                  }}
                >
                  <span>
                    <i className="fa fa-check"></i>
                    &nbsp;
                  </span>
                  Close Panic
                </button>
              </div>
            </div>
          }
        />
      );
    });
  };

  displaySupervisorClosedPanics = () => {
    var icon = require("./../../../../pins/18.png");
    var data = this.filterPanic(6);
    return data.map((p) => {
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email || ""}
              </p>
              <p>
                <b> Address: </b>
                {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""}
              </p>
              <p>
                <b> Nature: </b>
                {this.filterNature(p.natureId) == null
                  ? null
                  : this.filterNature(p.natureId).name}
              </p>
              <p>
                <b> Priority: </b>
                {this.filterPriority(p.priorityId) == null
                  ? null
                  : this.filterPriority(p.priorityId).name}
              </p>
              <p>
                <b> Operator: </b>
                {this.filterUser(p.operatorInvolved) == null
                  ? null
                  : this.filterUser(p.operatorInvolved).firstname +
                    " " +
                    this.filterUser(p.operatorInvolved).lastname}
              </p>
              <p>
                <b> Responder: </b>
                {this.filterUser(p.responderInvolved) == null
                  ? null
                  : this.filterUser(p.responderInvolved).firstname +
                    " " +
                    this.filterUser(p.responderInvolved).lastname}
              </p>
              <div>
                <center>
                  <h4> Closed </h4>
                </center>
              </div>
            </div>
          }
        />
      );
    });
  };

  displayFree = (type = "online") => {
    var features = null;
    var data = null;
    if (type == "online") {
      data = [...this.state.free];
      features = {
        shade: "darkgreen",
        spot: "darkgreen",
        showSpot: true,
        buzz: false,
      };
    } else if (type == "unknown") {
      data = [...this.state.unknown];
      features = {
        shade: "#DF9B26",
        spot: "#DF9B26",
        showSpot: true,
        buzz: false,
      };
    } else if (type == "offline") {
      data = [...this.state.offline];
      features = {
        shade: "#E25A55",
        spot: "#E25A55",
        showSpot: true,
        buzz: false,
      };
    } else {
      data = [];
    }
    return data.map((p) => {
      var icon = null;
      if (this.panicHasResponder(p.id) == null) {
        icon = require("./../../../../pins/5.png");
      } else {
        icon = require("./../../../../pins/12.png");
      }
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.lat)}
          lng={Number(p.lng)}
          features={features}
          content={
            <div style={{ marginTop: "10px", lineHeight: "10px", zIndex: 15 }}>
              <p>
                <b> Traccar Name: </b>
                {p.name}
              </p>
              <p>
                <b> Name: </b>
                {p.firstname} {p.lastname}
              </p>
              <p>
                <b> Contact: </b>
                {p.contact}
              </p>
              <p>
                <b> Email: </b>
                {p.email}
              </p>
              {this.panicHasResponder(p.id) == null ? (
                <p>
                  <b> Status: </b>
                  Free
                </p>
              ) : (
                <p>
                  <b> Status: </b>
                  on Duty
                </p>
              )}
            </div>
          }
        />
      );
    });
  };

  // displayBuzy = () => {
  //   var icon = require("./../../../../pins/12.png");
  //   return this.state.buzy.map((p) => {
  //     return (
  //       <Spot
  //         key={p.id}
  //         pin={icon}
  //         lat={Number(p.lat)}
  //         lng={Number(p.lng)}
  //         content={
  //           <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
  //             <p>
  //               <b> Name: </b>
  //               {p.firstname} {p.lastname}
  //             </p>
  //             <p>
  //               <b> Contact: </b>
  //               {p.contact}
  //             </p>
  //             <p>
  //               <b> Email: </b>
  //               {p.email}
  //             </p>
  //           </div>
  //         }
  //       />
  //     );
  //   });
  // };

  displayAssignmentSelector = () => {
    return this.filterResponders().map((r) => {
      return (
        <option key={r.id} value={r.id}>
          {r.firstname + " " + r.lastname}
        </option>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* {this.props.getPanel("Hello", ["a", "b"], [])} */}

        <ReactMapGL
          style={{ marginTop: "-50px", zIndex: 1 }}
          {...this.state.viewport}
          mapboxApiAccessToken={this.state.KEY}
          mapStyle={this.state.mapType}
          onViewportChange={(viewport) => {
            // setViewport(viewport);
            this.setState({
              ...this.state,
              viewport,
            });
          }}
        >
          {this.displayInQueryPanics()}
          {this.displayConfirmedPanics()}
          {this.displayResponderAssignedPanics()}
          {this.displayResponderResolvedPanics()}
          {this.displayOperatorResolvedPanics()}

          {/* {this.displaySupervisorClosedPanics()} */}

          {this.displayFree()}
          {this.displayFree("unknown")}
          {this.displayFree("offline")}
          {/* {this.displayBuzy()} */}
        </ReactMapGL>
      </React.Fragment>
    );
  }
}

export default Map;

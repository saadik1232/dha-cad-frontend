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
  getDevices,
  getPositions,
} from "./../../../../requests/Traccar/Devices/Devices";

import {
  getAllLocations,
  getBuzyLocations,
  getFreeLocations,
} from "./../../../../requests/Responders/Responders";
import Panel from "../../../../containers/Panel/Panel";

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
      zoom: this.props.zoom || 13,
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
    devices: [],
    positions: [],
  };

  confirmPanicAlert = async (id, opr, sup) => {
    if (opr != null) {
      await updatePanic(id, { statusId: 2, operatorInvolved: opr }, () => {
        ToastsStore.success("Panic Confirmed Successfully !");
      });
    } else if (sup != null) {
      await updatePanic(id, { statusId: 2, supervisorInvolved: sup }, () => {
        ToastsStore.success("Panic Confirmed Successfully !");
      });
    } else {
    }
  };

  assignPanicAlert = async (id, resp) => {
    await updatePanic(id, { statusId: 3, responderInvolved: resp }, () => {
      ToastsStore.success("Panic Assigned to a Responder Successfully !");
    });
  };

  responderResolvePanicAlert = async (id) => {
    await updatePanic(id, { statusId: 4 }, () => {
      ToastsStore.success("Panic Resolved by Responder Successfully !");
    });
  };

  operatorResolvePanicAlert = async (id) => {
    await updatePanic(id, { statusId: 5 }, () => {
      ToastsStore.success("Panic Resolved by Operator Successfully !");
    });
  };

  supervisorClosedPanicAlert = async (id) => {
    await updatePanic(id, { statusId: 6 }, () => {
      ToastsStore.success("Panic Closed By Supervisor Successfully !");
    });
  };

  init = async (cb = null) => {
    await getAllPanics((data) => {
      // console.log("Panics: ", data);
      if (data.length > this.state.panic.length) {
        Beep1();
        this.centeralize();
      }
      this.setState({
        ...this.state,
        panic: data,
      });
    });
    await getAllLocations((data) => {
      this.setState({
        ...this.state,
        free: data,
      });
    });
    // await this.props.buzy((data) => {
    //   this.setState({
    //     ...this.state,
    //     buzy: data,
    //   });
    // });
    await cb();
  };

  async componentDidMount() {
    // console.log("Running ... ");
    setInterval(async () => {
      await getDevices("admin", "L@s3rjet9045", (data) => {
        this.setState({
          ...this.state,
          devices: data,
        });
        console.log("Traccar: ", data);
      });
      await getPositions("admin", "L@s3rjet9045", (data) => {
        this.setState({
          ...this.state,
          positions: data,
        });
        console.log("Positions: ", data);
      });
      // console.log("Loop Running ...");
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
    setTimeout(() => {
      this.centeralize();
    }, 5000);
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
    var data = [...this.state.panic, ...this.state.free, ...this.state.buzy];
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

              {/* <Assignment
                item={p}
                displayAssignmentSelector={this.displayAssignmentSelector}
                assignPanicAlert={this.assignPanicAlert}
              /> */}
            </div>
          }
        />
      );
    });
  };

  displayResponderAssignedPanics = () => {
    var icon = require("./../../../../pins/10.png");
    var data = this.filterPanic(3);
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
              {/* <div>
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
              </div> */}
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
              {/* <div>
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
              </div> */}
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

  displayFree = () => {
    return this.state.free.map((p) => {
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
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
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

  filterDevice = (id) => {
    var d = this.state.devices.filter((d) => d.id == id);
    if (d.length > 0) {
      return d[0];
    } else {
      return null;
    }
  };

  displayTraccar = () => {
    return this.state.positions.map((p) => {
      var icon = require("./../../../../pins/1.png");
      return (
        <Spot
          key={p.id}
          pin={icon}
          lat={Number(p.latitude)}
          lng={Number(p.longitude)}
          content={
            <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
              <div style={{ fontSize: "10px" }}>
                <p>
                  <b> Name: </b>{" "}
                  {this.filterDevice(p.deviceId) == null
                    ? null
                    : this.filterDevice(p.deviceId).name}
                </p>
                <p>
                  <b> Phone: </b>{" "}
                  {this.filterDevice(p.deviceId) == null
                    ? null
                    : this.filterDevice(p.deviceId).phone}
                </p>
                <p>
                  <b> Status: </b>{" "}
                  {this.filterDevice(p.deviceId) == null
                    ? null
                    : this.filterDevice(p.deviceId).status}
                </p>
                <p>
                  <b> Disabled: </b>{" "}
                  {this.filterDevice(p.deviceId) == null
                    ? null
                    : this.filterDevice(p.deviceId).disabled}
                </p>
                <p>
                  <b> Distance: </b> {p.attributes.distance}
                </p>
                <p>
                  <b> Hours: </b> {p.attributes.hours}
                </p>
                <p>
                  <b> Ignition: </b> {p.attributes.ignition ? "On" : "Off"}
                </p>
                <p>
                  <b> Motion: </b> {p.attributes.motion ? "On" : "Off"}
                </p>
                <p>
                  <b> Speed: </b> {p.speed}
                </p>
              </div>
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

  getStatuses = () => {
    return (
      <React.Fragment>
        <div style={{ position: "absolute", top: 70, left: 40, zIndex: 5 }}>
          <Panel
            head={
              <div>
                <b>All Panics </b> &nbsp;
                <div className="badge pull-right">
                  {" "}
                  {this.state.panic.length}{" "}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Pending Panics </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(1).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Confirmed Panics </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(2).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Assigned Panics </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(3).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Resolved Panics </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(4).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Operator Resolved </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(5).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Supervisor Closed </b> &nbsp;
                <div className="badge pull-right">
                  {this.filterPanic(6).length}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
          <Panel
            head={
              <div>
                <b>Responders </b> &nbsp;
                <div className="badge pull-right">
                  {" "}
                  {this.filterResponders().length}{" "}
                </div>
                <div className="clearfix"></div>
              </div>
            }
          ></Panel>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.getStatuses()}
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
          {this.displaySupervisorClosedPanics()}

          {this.displayFree()}

          {this.displayTraccar()}
          {/* {this.displayBuzy()} */}
        </ReactMapGL>
      </React.Fragment>
    );
  }
}

export default Map;

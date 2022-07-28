import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  GetUsers,
  GetPanics,
  GetNatures,
  GetPriorities,
  UpdatePanics,
  OperatorAcceptPanic_UpdatePanics,
  OperatorAssignPanicToRes_UpdatePanics,
  OperatorResolvePanic_UpdatePanics,
  ClosePanic_UpdatePanics,
  SolvePanic_UpdatePanics,
  GetAllResponder,
  changeZoom,
  GetCenter,
} from "../../../../../actions/index";
import ReactMapGL from "react-map-gl";
import Spot from "./Spot";
import { Beep1, Beep2, Beep3, Beep4 } from "../../../../../Beeper/Beeper";
import { ToastsStore } from "react-toasts";
import { getCenter } from "geolib";
// import axios from "axios";
// import { URL } from "../../config/config";

const Map = (props) => {
  const count = useRef(0);
  count.current++;

  console.log("Supervisor Main Map: " + count.current);

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
  // const [lat, setLat] = useState(props.lat);
  // const [lng, setLng] = useState(props.lng);
  const [opr, setOpr] = useState("");

  const [viewport, setViewport] = useState({
    latitude: props.latitude || 31,
    longitude: props.longitude || 74,
    width: props.width || "100vw",
    height: props.height || "100vh",
    zoom: props.zoomLevel,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: props.latitude,
      longitude: props.longitude,
      zoom: props.zoomLevel,
    });
  }, [props.zoomLevel, props.longitude, props.latitude]);

  const [prev, setPrev] = useState(0);
  const [res, setRes] = useState("");

  const filterNature = (id) => {
    let data = props.natures.filter((item) => item.id == id);
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const filterPriority = (id) => {
    let data = props.priorities.filter((item) => item.id == id);
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const filterResponders = (id) => {
    let data1 = [...props.online, ...props.offline, ...props.unknown];
    let data = data1.filter((item) => {
      if (item.db != null) {
        return item.db.id == id;
      } else {
        return false;
      }
    });
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const filterOperators = (id) => {
    let data = props.operators.filter((item) => item.id == id);
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const filterSupervisors = (id) => {
    let data = props.supervisors.filter((item) => item.id == id);
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const init = async () => {
    // if (props.panic.length > prev) {
    //   console.error("New Panic");
    // }
    await props.getUsers();
    await props.getPanics();
    await props.getAllResponder();

    // console.warning("Prev: ", prev);
  };

  let loop;

  useEffect(() => {
    loop = setInterval(async () => {
      console.log("Panic Loop");
      await init();
    }, 3000);
    return () => {
      clearInterval(loop);
    };
  }, []);

  const handleNewPanic = async () => {
    await setPrev((item) => {
      let p = [...props.panics];
      // ToastsStore.success(JSON.stringify(p));
      if (p.length > item) {
        Beep1();
        props.getCenter(props.panics);
        ToastsStore.info("New Panic Alert has Arrived ");
      }
      return p.length;
    });
  };

  useEffect(() => {
    // Beep1();
    handleNewPanic();
    return;
  }, [props.panics]);

  useEffect(() => {
    // console.error("Prev: ", prev);
    return;
  }, [prev]);

  // const IncreaseZoom = async () => {
  //   if (viewport.zoom < 30) {
  //     await setViewport({
  //       latitude: viewport.latitude,
  //       longitude: viewport.longitude,
  //       width: viewport.width,
  //       height: viewport.height,
  //       zoom: viewport.zoom + 1,
  //     });
  //   }
  // };

  // const DeccreaseZoom = async () => {
  //   if (viewport.zoom > 5) {
  //     await setViewport({
  //       latitude: viewport.latitude,
  //       longitude: viewport.longitude,
  //       width: viewport.width,
  //       height: viewport.height,
  //       zoom: viewport.zoom - 1,
  //     });
  //   }
  // };

  // var zoomer = false;
  // const center = async (data) => {
  //   if (zoomer == false) {
  //     var lists = [];
  //     for (let i = 0; i < data.length; i++) {
  //       await lists.push({
  //         latitude: Number(data[i].lat),
  //         longitude: Number(data[i].lng),
  //       });
  //     }
  //     if (lists.length > 0) {
  //       console.log("Access: ", lists);
  //       var url = URL + "/panics/getCenter";
  //       axios
  //         .post(url, { data: lists })
  //         .then(async (response) => {
  //           var info = response.data.result.data;
  //           console.log("Access2: ", info);
  //           await setViewport({
  //             latitude: info.latitude,
  //             longitude: info.longitude,
  //             width: viewport.width,
  //             height: viewport.height,
  //             zoom: viewport.zoom,
  //           });
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     }
  //     zoomer = true;
  //   }
  // };

  // const [list, setList] = useState([]);
  // const [list2, setList2] = useState([]);
  // const [list3, setList3] = useState([]);
  // const [list4, setList4] = useState([]);
  // const [list5, setList5] = useState([]);

  const getSpots = (
    data,
    features,
    pin = "./../../../pin/8.png",
    type = ""
  ) => {
    let icon = pin;
    if (type == "responder") {
      return data.map((p) => {
        return (
          <Spot
            key={p.id}
            pin={icon}
            lat={Number(p.lat)}
            lng={Number(p.lng)}
            features={features}
            content={
              <div style={{ marginTop: "10px", lineHeight: "8px", zIndex: 15 }}>
                <p>
                  <b> Name: </b>
                  {p.db == null
                    ? null
                    : p.db.firstname + " " + p.db.lastname}{" "}
                </p>
                <p>
                  {" "}
                  <b> Traccar: </b> {p.name || "Anonymous"}{" "}
                </p>
                <p>
                  <b> Contact: </b>
                  {p.db == null ? p.contact || "" : p.db.contact}
                </p>
                <p>
                  <b> Email: </b>
                  {p.db == null ? null : p.db.email || ""}
                </p>
                <p>
                  <b> Address: </b>
                  {/* { {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""} } */}
                  <span style={{ lineHeight: 1 }}>
                    {p.db == null ? null : p.db.address || ""}
                  </span>
                </p>
                {/* <p>
                  <b> Nature: </b>
                  {filterNature(p.natureId) == null
                    ? null
                    : filterNature(p.natureId).name}
                </p> */}
                {/* <p>
                  <b> Priority: </b>
                  {filterPriority(p.priorityId) == null
                    ? null
                    : filterPriority(p.priorityId).name}
                </p> */}
                {/* <p>
                  <b> Responder: </b>
                 
                  {filterResponders(p.responderInvolved || 0) == null
                    ? null
                    : filterResponders(p.responderInvolved).name}
                </p> */}
                {/* <p>
                  <b> Operator: </b>
                  
                  {filterOperators(p.operatorInvolved || 0) == null
                    ? null
                    : filterOperators(p.operatorInvolved).firstname}
                </p> */}
                {/* <p>
                  <b> Supervisor: </b>
                 
                  {filterSupervisors(p.supervisorInvolved || 0) == null
                    ? null
                    : filterSupervisors(p.supervisorInvolved).firstname}
                </p> */}
                {/* <div>{popButton(p)}</div> */}
              </div>
            }
          />
        );
      });
    } else {
      return data.map((p) => {
        return (
          <Spot
            key={p.id}
            pin={icon}
            lat={Number(p.lat)}
            lng={Number(p.lng)}
            features={{ ...features, timer: new Date(p.createdAt) }}
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
                  {/* { {p.house || ""} {p.street || ""} {p.town || ""} {p.city || ""} } */}
                  <span style={{ lineHeight: 1 }}>{p.address || ""}</span>
                </p>
                <p>
                  <b> Nature: </b>
                  {filterNature(p.natureId) == null
                    ? null
                    : filterNature(p.natureId).name}
                </p>
                <p>
                  <b> Priority: </b>
                  {filterPriority(p.priorityId) == null
                    ? null
                    : filterPriority(p.priorityId).name}
                </p>
                <p style={{ lineHeight: "15px" }}>
                  <b> Responder: </b>
                  {/* {p.responderInvolved} */}
                  {filterResponders(p.responderInvolved || 0) == null
                    ? null
                    : filterResponders(p.responderInvolved).name}
                </p>
                <p>
                  <b> Operator: </b>
                  {/* {p.operatorInvolved} */}
                  {filterOperators(p.operatorInvolved || 0) == null
                    ? null
                    : filterOperators(p.operatorInvolved).firstname}
                </p>
                <p>
                  <b> Supervisor: </b>
                  {/* {p.supervisorInvolved} */}
                  {filterSupervisors(p.supervisorInvolved || 0) == null
                    ? null
                    : filterSupervisors(p.supervisorInvolved).firstname}
                </p>
                {p.customerRating && (
                  <>
                    <p>
                      <b> Customer rating: </b>
                      {p.customerRating == 0 ? "0" : p.customerRating}
                    </p>
                  </>
                )}
                <div>{getOper(p.operatorInvolved, p)}</div>
                <br />
                <div>
                  {p.statusId == 1 ||
                  p.statusId == 2 ||
                  p.statusId == 3 ||
                  p.statusId == 7 ||
                  p.statusId == 4 ||
                  p.statusId == 5 ? (
                    <button
                      className="btn btn-xs btn-danger btn-block"
                      onClick={async (e) => {
                        e.preventDefault();
                        await props.closePanic(p.id, {
                          userId: props.user.id,
                        }); // Bilal
                        // init();
                        Beep2();
                      }}
                    >
                      Close
                    </button>
                  ) : null}
                </div>
                <div>{p.isCancelled == 1 ? <h3> Cancelled </h3> : null}</div>
              </div>
            }
          />
        );
      });
    }
  };

  const getOper = (data, item) => {
    if (!data) {
      return null;
    } else {
      if (
        item.statusId == 1 &&
        item.operatorInvolved == null &&
        item.operatorInvolved == 0
      ) {
        return (
          <>
            <select
              className="form-control"
              value={opr}
              onChange={(e) => setOpr(e.target.value)}
            >
              <option value=""> None </option>
              {getOperators()}
            </select>
            <br />
            <button
              className="btn btn-info btn-xs btn-block"
              onClick={async (e) => {
                e.preventDefault();
                await props.confirmedByOperatorPanics(item.id, {
                  operatorInvolved: opr,
                  // statusId: 2,
                }); // Bilal
                // init();
                setOpr("");
              }}
            >
              {" "}
              Set Operator{" "}
            </button>
            <br />
            <button
              className="btn btn-primary btn-xs btn-block"
              onClick={async (e) => {
                e.preventDefault();
                await props.updatePanics(item.id, {
                  supervisorInvolved: props.user.id,
                  statusId: 2,
                }); // Bilal
                init();
              }}
            >
              <span>
                <i className="fa fa-check"></i>
                &nbsp;
              </span>
              Self Confirm
            </button>
          </>
        );
      } else if (item.statusId == 1) {
        return (
          <button
            className="btn btn-primary btn-xs btn-block"
            onClick={async (e) => {
              e.preventDefault();
              await props.operatorAcceptPanic(item.id, {
                id: item,
                // operatorInvolved: props.user.id,
                // statusId: 2,
              }); // Bilal
              // init();
            }}
          >
            <span>
              <i className="fa fa-check"></i>
              &nbsp;
            </span>
            Confirm
          </button>
        );
      } else if (
        item.statusId == 2 &&
        item.operatorInvolved != 0 &&
        item.operatorInvolved != null
      ) {
        return (
          <>
            <select
              className="form-control"
              value={res}
              onChange={(e) => setRes(e.target.value)}
            >
              <option value=""> None </option>
              {getResponders2()}
            </select>
            <br />
            <button
              className="btn btn-primary btn-xs btn-block"
              onClick={async (e) => {
                let ress = [
                  ...props.online,
                  ...props.offline,
                  ...props.unknown,
                ];
                // console.error("Res: ", ress);
                let Data = ress.filter((it) => it.id == Number(res));
                console.error(Data);
                let abc = Data[0];

                if (abc.db == null) {
                  alert("Responder is not available in the Database: " + res);
                } else {
                  e.preventDefault();
                  // console.error({ res, id: item.id });
                  await props.operatorAssignPanicToRes(item.id, {
                    contact: item.contact,
                    responderInvolved: abc.db.id,
                    // statusId: 3,
                  }); // Bilal
                  await setRes("");
                  // await init();
                }
              }}
            >
              <span>
                <i className="fa fa-check"></i>
                &nbsp;
              </span>
              Assign
            </button>
          </>
        );
      } else if (
        item.statusId == 2 &&
        item.supervisorInvolved != 0 &&
        item.supervisorInvolved != null
      ) {
        return (
          <>
            <select
              className="form-control"
              value={res}
              onChange={(e) => setRes(e.target.value)}
            >
              <option value=""> None </option>
              {getResponders2()}
            </select>
            <br />
            <button
              className="btn btn-primary btn-xs btn-block"
              onClick={async (e) => {
                let ress = [
                  ...props.online,
                  ...props.offline,
                  ...props.unknown,
                ];
                // console.error("Res: ", ress);
                let Data = ress.filter((it) => it.id == Number(res));
                console.error(Data);
                let abc = Data[0];

                if (abc.db == null) {
                  // alert("Responder is not available in the Database: " + res);
                } else {
                  e.preventDefault();
                  // console.error({ res, id: item.id });
                  await props.updatePanics(item.id, {
                    responderInvolved: abc.db.id,
                    statusId: 3,
                  }); // Bilal
                  await setRes("");
                  // await init();
                }
              }}
            >
              <span>
                <i className="fa fa-check"></i>
                &nbsp;
              </span>
              Assign
            </button>
          </>
        );
      } else if (
        item.statusId == 4 &&
        item.responderInvolved != 0 &&
        item.responderInvolved != null
      ) {
        return (
          <button
            className="btn btn-primary btn-xs btn-block"
            onClick={async (e) => {
              e.preventDefault();
              await props.operatorResolvePanic(item.id, {
                // statusId: props.user.roleId == 3 ? 5 : 6,
              }); // Bilal
              // init();
            }}
          >
            <span>
              <i className="fa fa-check"></i>
              &nbsp;
            </span>
            Resolve
          </button>
        );
      } else {
        return null;
      }
    }
  };

  // const content = (p) => {
  //   return (

  //   );
  // };

  const getOperators = () => {
    return props.operators.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <option value={item.id}>
            {" "}
            {item.firstname + " " + item.lastname}{" "}
          </option>
        </React.Fragment>
      );
    });
  };

  const popButton = async (item) => {
    return "false";
  };

  const getResponders2 = () => {
    let data = [...props.online, ...props.offline, ...props.unknown]; // props.online;
    return data.map((item, index) => {
      if (item.db || true) {
        return (
          <React.Fragment key={index}>
            <option value={item.id}>{item.name || ""}</option>
          </React.Fragment>
        );
      } else {
        return null;
      }
    });
  };

  // const goPoint = async (pointer, set, list, data2 = null, cb = null) => {
  //   if (pointer != null) {
  //     await pointer(async (data) => {
  //       if (data.length > list.length) {
  //         await set([...data]);
  //         var centers = [];
  //         if (data2 == null) {
  //           centers = [...data];
  //         } else {
  //           centers = [...data, ...data2];
  //         }
  //         await center(centers);
  //         if (cb != null) {
  //           centers = centers.filter((c) => c.lat != 0 && c.long != 0);
  //           cb(centers);
  //         } else {
  //         }
  //       } else {
  //         var centers = [...data];
  //         await center(centers);
  //         if (cb != null) {
  //           centers = centers.filter((c) => c.lat != 0 && c.long != 0);
  //           cb(centers);
  //         } else {
  //         }
  //       }
  //     });
  //   } else {
  //     if (data2 != null && data2.length > 0) {
  //       var centers = [...data2];
  //       await center(centers);
  //       if (cb != null) {
  //         centers = centers.filter((c) => c.lat != 0 && c.long != 0);
  //         cb(centers);
  //       } else {
  //       }
  //     } else {
  //       var centers = [];
  //       await center(centers);
  //       if (cb != null) {
  //         centers = centers.filter((c) => c.lat != 0 && c.long != 0);
  //         cb(centers);
  //       } else {
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   setInterval(async () => {
  //     if (props.getPoints != null) {
  //       await goPoint(props.getPoints, setList, list, null, async (r) => {
  //         console.log("Round 1: ", r);
  //         if (props.getPoints2 != null) {
  //           await goPoint(props.getPoints2, setList2, list2, r, async (r2) => {
  //             console.log("Round 2: ", r2);
  //             if (props.getPoints3 != null) {
  //               await goPoint(props.getPoints3, setList3, list3, r2, null);
  //             }
  //           });
  //         }
  //       });
  //     } else if (props.getPoints2 != null) {
  //       goPoint(props.getPoints2, setList2, list2, null, null);
  //     } else if (props.getPoints3 != null) {
  //       goPoint(props.getPoints3, setList3, list3, null, null);
  //     }
  //   }, 1000);
  // }, [props.changer, "text"]);

  return (
    <React.Fragment>
      <div>
        {/* <div style={{ position: "absolute", top: 50, right: 10, zIndex: 10 }}> */}
        {/* <button
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
        </div> */}
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
          {getSpots(
            props.inQueryPanics,
            {
              shade: "red",
              spot: "green",
              showSpot: false,
              buzz: true,
              showTimer: true,
            },
            require("./../../../../pins/13.png")
          )}
          {getSpots(
            props.confirmedByOperatorPanics,
            {
              shade: "blue",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/8.png")
          )}
          {getSpots(
            props.assignedToResponderPanics,
            {
              shade: "yellow",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/8.png")
          )}
          {getSpots(
            props.confirmedByResponderPanics,
            {
              shade: "lightgreen",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/10.png")
          )}
          {getSpots(
            props.resolvedByResponderPanics,
            {
              shade: "lightgreen",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/15.png")
          )}
          {/* {getSpots(
            props.resolvedByOperatorPanics,
            {
              shade: "green",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/17.png")
          )} */}
          {/* {getSpots(
            props.closedBySupervisorPanics,
            {
              shade: "green",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/18.png")
          )} */}
          {/* {getSpots(
            props.closedByCustomerPanics,
            {
              shade: "black",
              spot: "blue",
              showSpot: false,
              buzz: false,
              showTimer: true,
            },
            require("./../../../../pins/18.png")
          )} */}
          {getSpots(
            props.online,
            {
              shade: "lightgreen",
              spot: "darkgreen",
              showSpot: true,
              buzz: false,
            },
            require("./../../../../pins/12.png"),
            "responder"
          )}
          {getSpots(
            props.offline,
            {
              shade: "pink",
              spot: "red",
              showSpot: true,
              buzz: false,
            },
            require("./../../../../pins/12.png"),
            "responder"
          )}
          {getSpots(
            props.unknown,
            {
              shade: "yellow",
              spot: "orange",
              showSpot: true,
              buzz: false,
            },
            require("./../../../../pins/12.png"),
            "responder"
          )}
          {/* {getSpots(list2, "/images/pin2.png")} */}
          {/* {getSpots(list3, "/images/pin3.png")} */}
        </ReactMapGL>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  natures: state.natures,
  priorities: state.priorities,
  online: state.onlineResponders,
  offline: state.offlineResponders,
  unknown: state.unknownResponders,
  panics: state.panics,
  operators: state.operators,
  supervisors: state.supervisors,
  panics: state.panics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  cancelled: state.cancelledPanics,
  inQueryPanics: state.inQueryPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  confirmedByOperatorPanics: state.confirmedByOperatorPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  assignedToResponderPanics: state.assignedToResponderPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  confirmedByResponderPanics: state.confirmedByResponderPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  resolvedByResponderPanics: state.resolvedByResponderPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  resolvedByOperatorPanics: state.resolvedByOperatorPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  closedBySupervisorPanics: state.closedBySupervisorPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  closedByCustomerPanics: state.closedByCustomerPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
  zoomLevel: state.zoomLevel,
  latitude: state.latitude,
  longitude: state.longitude,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  getPanics: () => GetPanics(dispatch),
  getUsers: () => GetUsers(dispatch),
  getNatures: () => GetNatures(dispatch),
  getCenter: (coords) => GetCenter(dispatch, coords),
  getAllResponder: () => GetAllResponder(dispatch),
  getPriorities: () => GetPriorities(dispatch),
  updatePanics: (id, data) => UpdatePanics(dispatch, id, data),
  operatorAcceptPanic: (id, data) =>
    OperatorAcceptPanic_UpdatePanics(dispatch, id, data),
  operatorAssignPanicToRes: (id, data) =>
    OperatorAssignPanicToRes_UpdatePanics(dispatch, id, data),
  operatorResolvePanic: (id, data) =>
    OperatorResolvePanic_UpdatePanics(dispatch, id, data),
  closePanic: (id, data) => ClosePanic_UpdatePanics(dispatch, id, data),
  solvePanic: (id, data) => SolvePanic_UpdatePanics(dispatch, id, data),
  changeZoom: (data) => changeZoom(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

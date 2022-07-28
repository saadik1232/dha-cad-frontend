import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  UserLogout,
  GetAllResponder,
  GetCenter,
  changeZoom,
} from "./../../../../../actions/index";
import Reports from "../Reports/Reports";
// import Plot from "react-plotly.js";
import BarChart from "react-bar-chart";
import _ from "lodash";
import HSBar from "react-horizontal-stacked-bar-chart";
import Notification from "../Notifications/private notifications/Notification";
import { CheckIfEmpty } from "../../../../../Helpers/utils";

const Responders = (props) => {
  var data365;

  console.log("Supervisor - Responder Widget");

  const OperatorWidget = useRef("");
  const lineGraphWidget = useRef("");
  const onlinRespWidget = useRef("");
  const offlinRespWidget = useRef("");
  const unknownRespWidget = useRef("");
  const buzyRespWidget = useRef("");
  const freeRespWidget = useRef("");
  const boundryRespWidget = useRef("");

  const init = async () => {
    // await props.getResponders();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  function filter_res(data) {
    if (data) {
      return data.filter(function (responder) {
        return responder.db.type == "emergency";
      });
    } else {
      return data;
    }
  }

  const getTableData2 = (data) => {
    return data.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td>{item.id}</td>
            <td> {item.firstname + " " + item.lastname} </td>
            <td> {item.contact} </td>
            <td> {item.email} </td>
            <td>
              {" "}
              {item.userActivation ? (
                <i className="fa fa-toggle-on"></i>
              ) : (
                  <i className="fa fa-toggle-off"></i>
                )}
            </td>
            {/* <td> {item.position.speed} </td> */}
            <td> </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  const getTableData = (data) => {
    let data2 = getResss(data);
    //testing code
    let data365 = data2.filter(function (res) {
      return res.db.type == "emergency";
    });
    return data365.map((item, index) => {
      //console.log("map fuctions of Items", item);
      // let color = null;
      // if (item.db) {
      //   if (item.db.userActivation == true) {
      //     color = "green";
      //   } else {
      //     color = "transparent";
      //   }
      // } else {
      //   color = "transparent";
      // }
      // console.error(color);
      return (
        <React.Fragment key={index}>
          <tr
            // style={{ background: "red !important" }}
            onDoubleClick={() =>
              props.getCenter([
                { latitude: Number(item.lat), longitude: Number(item.lng) },
              ])
            }
          >
            <td> {item.id} </td>
            <td> {item.name} </td>
            <td> {item.db == null ? null : item.db.contact} </td>
            <td> {item.position.latitude} </td>
            <td> {item.position.longitude} </td>
            <td> {item.position.speed} </td>
            <td> {item.db.type} </td>
            <td> </td>
            {/* <td>
              <button
                className="btn btn-xs btn-primary"
                onClick={() => edit(item.id)}
              >
                <i className="fa fa-pencil"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-xs btn-primary"
                onClick={() => del(item.id)}
              >
                <i className="fa fa-trash-o"></i>
              </button>
            </td> */}
          </tr>
        </React.Fragment>
      );
    });
  };

  const getTable = (data) => {
    return (
      <React.Fragment>
        <div style={{ overflow: "auto" }} className="inverse-theme">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Name </th>
                <th> Contact </th>
                <th> Lat </th>
                <th> Lng </th>
                <th> Speed </th>
                <th> temp type </th>
                {/* <th> - </th>
                <th> - </th> */}
              </tr>
            </thead>
            <tbody>{getTableData(data)}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  };

  const getTable2 = (data) => {
    return (
      <React.Fragment>
        <div style={{ overflow: "auto" }} className="inverse-theme">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Name </th>
                <th> Contact </th>
                <th> Email </th>
                <th> Active </th>
              </tr>
            </thead>
            <tbody>{getTableData2(data)}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  };

  const getOperss = () => {
    let groupIds = props.groups.map((item) => item.id);
    let result = props.operators.filter((item) => {
      let group = Number(item.groupId);
      if (_.includes(groupIds, group)) {
        return true;
      } else {
        return false;
      }
    });
    // console.error(result);
    return result;
  };

  const getResss = (data) => {
    let info = props.groups2.map((p) => {
      let ele = p;
      let grouper = ele.groupId;
      let theGroup = props.allGroups.filter((item) => item.id == grouper);
      if (theGroup && theGroup.length > 0) {
        return theGroup[0];
      }
    });
    let info2 = [];
    if (info && info.length > 0) {
      info2 = props.allGroups.filter((item) => info[0].id == item.groupId);
    }
    let groupIds = info2.map((item) => item.id);
    let result = data.filter((item) => {
      if (item.db != null) {
        let group = Number(item.db.groupId);
        if (_.includes(groupIds, group)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    return result;
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          // scrollBehavior: "inherit",
          direction: "rtl",
          marginRight: "10px",
        }}
      >
        {/* my code for firebase */}
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            window.location = "/privatenotification";
            // props.history.push("/notification");
            //<Redirect to="/notification"></Redirect>;
          }}
        >
          <center>
            Private Notifications&nbsp; <i className="fa"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            window.location = "/publicnotification";
            // props.history.push("/notification");
            //<Redirect to="/notification"></Redirect>;
          }}
        >
          <center>
            Public Notifications&nbsp; <i className="fa"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />

        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            window.location = "/usernotification";
            // props.history.push("/notification");
            //<Redirect to="/notification"></Redirect>;
          }}
        >
          <center>
            User Notifications&nbsp; <i className="fa"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        {/* end of my code */}

        <div style={{ direction: "ltr" }}>
          {/* <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                OperatorWidget.current.style.display == "none" ||
                OperatorWidget.current.style.display == ""
              ) {
                OperatorWidget.current.style.display = "block";
              } else {
                OperatorWidget.current.style.display = "none";
              }
            }}
          >
            <center>
              {" "}
              Operators&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} /> */}
          {/* <div ref={OperatorWidget} style={{ display: "none" }}>
            {getTable2(getOperss())}
          </div> */}
          <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                lineGraphWidget.current.style.display == "none" ||
                lineGraphWidget.current.style.display == ""
              ) {
                lineGraphWidget.current.style.display = "block";
              } else {
                lineGraphWidget.current.style.display = "none";
              }
            }}
          >
            <center>
              {" "}
              Responder Performance&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>

          <hr style={{ padding: 0, margin: 0 }} />
          <div
            ref={lineGraphWidget}
            style={{ display: "block" }}
            className="inverse-theme"
          >
            <Reports />
          </div>

          <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                onlinRespWidget.current.style.display == "none" ||
                onlinRespWidget.current.style.display == ""
              ) {
                onlinRespWidget.current.style.display = "block";
              } else {
                onlinRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.online.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              Online Responders&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} />
          {/* {CheckIfEmpty(props.online) ? (

                        <div ref={onlinRespWidget} style={{ display: "none" }}>            
                        {getTable(props.online)}
                      </div>
          ): (
                        <div ref={onlinRespWidget} style={{ display: "none" }}>            
                        {getTable(props.online)}
                      </div>  
              ) } */}

          {/* {(data365 = filter_res(props.online))} */}

          <div ref={onlinRespWidget} style={{ display: "none" }}>
            {getTable(props.online)}
          </div>

          <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                offlinRespWidget.current.style.display == "none" ||
                offlinRespWidget.current.style.display == ""
              ) {
                offlinRespWidget.current.style.display = "block";
              } else {
                offlinRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.offline.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              Offline Responders&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} />
          <div ref={offlinRespWidget} style={{ display: "none" }}>
            {getTable(props.offline)}
          </div>
          {/* <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                unknownRespWidget.current.style.display == "none" ||
                unknownRespWidget.current.style.display == ""
              ) {
                unknownRespWidget.current.style.display = "block";
              } else {
                unknownRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.unknown.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              Unknown Responders&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} /> */}
          {/* <div ref={unknownRespWidget} style={{ display: "none" }}>
            {getTable(props.unknown)}
          </div> */}

          {/* <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                boundryRespWidget.current.style.display == "none" ||
                boundryRespWidget.current.style.display == ""
              ) {
                boundryRespWidget.current.style.display = "block";
              } else {
                boundryRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.outBound.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              {" "}
              Cross Boundries&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} />
          <div ref={boundryRespWidget} style={{ display: "none" }}>
            {getTable(_.uniqBy(props.outBound, "id"))}
          </div> */}
          <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                buzyRespWidget.current.style.display == "none" ||
                buzyRespWidget.current.style.display == ""
              ) {
                buzyRespWidget.current.style.display = "block";
              } else {
                buzyRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.buzy.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              {" "}
              Buzy Responders&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} />
          <div ref={buzyRespWidget} style={{ display: "none" }}>
            {getTable(_.uniqBy(props.buzy, "id"))}
          </div>

          <h4
            style={{ padding: "5px" }}
            onClick={() => {
              if (
                freeRespWidget.current.style.display == "none" ||
                freeRespWidget.current.style.display == ""
              ) {
                freeRespWidget.current.style.display = "block";
              } else {
                freeRespWidget.current.style.display = "none";
              }
            }}
            onDoubleClick={() =>
              props.getCenter(
                props.free.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>
              {" "}
              Free Responders&nbsp; <i className="fa fa-caret-down"></i>{" "}
            </center>
          </h4>
          <hr style={{ padding: 0, margin: 0 }} />
          <div ref={freeRespWidget} style={{ display: "none" }}>
            {getTable(_.uniqBy(props.free, "id"))}
          </div>

          <br />
          <br />
          {/* <center>
            <BarChart
              ylabel="Responders"
              width={400}
              height={300}
              margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
              data={
                // [3, 5, 1, 7, 9, 12, 4]
                [
                  { text: "Resp1", value: 500, barColor: "red" },
                  { text: "Resp2", value: 300 },
                  { text: "Resp3", value: 600 },
                  { text: "Resp4", value: 200 },
                  { text: "Resp5", value: 400 },
                  { text: "Resp6", value: 700 },
                  { text: "Resp7", value: 100 },
                ]
              }
              // onBarClick={this.handleBarClick}
            />
            &nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center> */}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  offline: state.offlineResponders,
  online: state.onlineResponders,
  unknown: state.unknownResponders,
  outBound: state.outBoundResponders,
  buzy: state.buzyResponders,
  free: state.freeResponders,
  allGroups: state.groups,
  groups: state.groups.filter((item) => item.groupId == state.logger.groupId),
  groups2: state.groups.filter((item) => {
    let sprvsr = item.id == state.logger.groupId;
    if (sprvsr) {
      return true;
    } else {
      return false;
    }
  }),
  operators: state.operators,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  // getResponders: () => GetAllResponder(dispatch),
  getCenter: (data) => GetCenter(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Responders);

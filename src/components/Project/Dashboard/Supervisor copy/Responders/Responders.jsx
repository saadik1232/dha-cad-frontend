import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  GetAllResponder,
  GetCenter,
} from "../../../../../actions/index";
import Reports from "../Reports/Reports";
// import Plot from "react-plotly.js";
import BarChart from "react-bar-chart";
import _ from "lodash";

const Responders = (props) => {
  console.log("Supervisor - Responder Widget");

  const init = async () => {
    // await props.getResponders();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  const getTableData2 = (data) => {
    return data.map((item, index) => {
      // let color = !item.userActivation ? "#eee" : "transparent";
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
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
    return data.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr
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
        <div style={{ direction: "ltr" }}>
          <h4 style={{ textDecoration: "underline" }}>
            <center> Operators </center>
          </h4>
          <div>{getTable2(props.operators)}</div>
          <h4 style={{ textDecoration: "underline" }}>
            <center> Responder Performance </center>
          </h4>
          <div className="inverse-theme">
            <Reports />
          </div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() =>
              props.getCenter(
                props.online.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>Online Responders </center>
          </h4>
          <div>{getTable(props.online)}</div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() =>
              props.getCenter(
                props.offline.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>Offline Responders </center>
          </h4>
          <div>{getTable(props.offline)}</div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() =>
              props.getCenter(
                props.unknown.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center>Unknown Responders </center>
          </h4>
          <div>{getTable(props.unknown)}</div>

          <h4
            style={{ textDecoration: "underline" }}
            onClick={() =>
              props.getCenter(
                props.outBound.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center> Cross Boundries </center>
          </h4>
          <div>{getTable(_.uniqBy(props.outBound, "id"))}</div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() =>
              props.getCenter(
                props.outBound.map((item) => {
                  return { latitude: item.lat, longitude: item.lng };
                })
              )
            }
          >
            <center> Buzy Responders </center>
          </h4>
          <div>{getTable(_.uniqBy(props.buzy, "id"))}</div>

          <br />
          <br />
          <center>
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
          </center>
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
  operators: state.operators,
  buzy: state.buzyResponders,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  // getResponders: () => GetAllResponder(dispatch),
  getCenter: (data) => GetCenter(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Responders);

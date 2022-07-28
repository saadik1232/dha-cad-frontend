import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./node_modules/react-circular-progressbar/dist/styles.css";
import Circle from "react-circle";
import { connect } from "react-redux";
import {
  UserLogout,
  GetPanics,
  GetCenter,
} from "../../../../../actions/index";

const Panics = (props) => {
  console.log("Supervisor - Panics Widget");

  const init = async () => {
    // await props.getPanics();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  const getTableData = (data) => {
    return data.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr
            onDoubleClick={() =>
              props.getCenter([
                {
                  latitude: Number(item.lat),
                  longitude: Number(item.lng),
                },
              ])
            }
          >
            <td> {item.id} </td>
            <td> {item.contact} </td>
            <td> {item.nature.name} </td>
            <td> {item.priority.name} </td>
            <td> {item.lat} </td>
            <td> {item.lng} </td>
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
                <th> Contact </th>
                <th> Nature </th>
                <th> Priority </th>
                <th> Lat </th>
                <th> Lng </th>
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

  const getLength = (data) => {
    if (data.length > 0) {
      return (Number(data.length) / Number(props.panics.length)) * 100;
    } else {
      return 0;
    }
  };

  const getStyles = (bg) => {
    return buildStyles({
      rotation: 0.25,
      strokeLinecap: "butt",
      textSize: "30px",
      pathTransitionDuration: 0.3,
      pathColor: bg,
      textColor: "#369",
      trailColor: "#d6d6d6",
      backgroundColor: "#3e98c7",
      text: {
        // Text color
        fill: "#f88",
        // Text size
        fontSize: "20px",
      },
    });
  };

  const panicLengthString = (data) => {
    return Number(data.length) == 0 ? "0" : Number(data.length);
  };

  return (
    <>
      <div style={{ overflow: "auto", height: "100vh" }}>
        <h4 style={{ textDecoration: "underline" }}>
          <center> Panic Reports </center>
        </h4>
        <center className="inverse-theme" style={{ padding: "10px" }}>
          <div className="" style={{ width: "300px" }}>
            {/* <PieChart
              data={[
                { title: "One", value: 10, color: "lightblue" },
                { title: "Two", value: 15, color: "#919" },
                { title: "Three", value: 20, color: "#419" },
                { title: "Four", value: 20, color: "#999" },
              ]}
            /> */}
            <div className="row">
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.inQueryPanics)}
                  text={panicLengthString(props.inQueryPanics)}
                  styles={getStyles("#369")}
                />
                In Query
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.confirmedByOperatorPanics)}
                  text={panicLengthString(props.confirmedByOperatorPanics)}
                  styles={getStyles("#369")}
                />
                Operator Confirmed
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.assignedToResponderPanics)}
                  text={panicLengthString(props.assignedToResponderPanics)}
                  styles={getStyles("#369")}
                />
                Assigned Responder
              </div>
              <div className="col-md-12">
                {" "}
                <br />{" "}
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.confirmedByResponderPanics)}
                  text={panicLengthString(props.confirmedByResponderPanics)}
                  styles={getStyles("#369")}
                />
                Responder Confirmed
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.resolvedByResponderPanics)}
                  text={panicLengthString(props.resolvedByResponderPanics)}
                  styles={getStyles("#369")}
                />
                Responder Resolved
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.resolvedByOperatorPanics)}
                  text={panicLengthString(props.resolvedByOperatorPanics)}
                  styles={getStyles("#369")}
                />
                Operator Resolved
              </div>
              <div className="col-md-12">
                {" "}
                <br />{" "}
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.closedBySupervisorPanics)}
                  text={panicLengthString(props.closedBySupervisorPanics)}
                  styles={getStyles("#369")}
                />
                Supervisor Closed
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.closedByCustomerPanics)}
                  text={panicLengthString(props.closedByCustomerPanics)}
                  styles={getStyles("#369")}
                />
                Customer Closed
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.cancelledPanics)}
                  text={panicLengthString(props.cancelledPanics)}
                  styles={getStyles("#369")}
                />
                Cancelled
              </div>
            </div>
          </div>
        </center>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.panics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> All Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>{getTable(props.panics)}</div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.inQueryPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> InQuery Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.inQueryPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.confirmedByOperatorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Confirmed By Operator Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.confirmedByOperatorPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.assignedToResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Assigned To Responder Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.assignedToResponderPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.confirmedByResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Confirmed By Responder Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.confirmedByResponderPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.resolvedByResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Resolved By Responder Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.resolvedByResponderPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.resolvedByOperatorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Resolved By Operator Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.resolvedByOperatorPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.closedBySupervisorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Closed By Supervisor Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.closedBySupervisorPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.closedByCustomerPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Closed By Customer Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.closedByCustomerPanics)}
        </div>
        <h4
          style={{ textDecoration: "underline" }}
          onClick={() =>
            props.getCenter(
              props.cancelledPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> Cancelled Panics </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>
          {getTable(props.cancelledPanics)}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  panics: state.panics,
  inQueryPanics: state.inQueryPanics,
  confirmedByOperatorPanics: state.confirmedByOperatorPanics,
  assignedToResponderPanics: state.assignedToResponderPanics,
  confirmedByResponderPanics: state.confirmedByResponderPanics,
  resolvedByResponderPanics: state.resolvedByResponderPanics,
  resolvedByOperatorPanics: state.resolvedByOperatorPanics,
  closedBySupervisorPanics: state.closedBySupervisorPanics,
  closedByCustomerPanics: state.closedByCustomerPanics,
  cancelledPanics: state.cancelledPanics,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  // getPanics: () => GetPanics(dispatch),
  getCenter: (data) => GetCenter(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panics);

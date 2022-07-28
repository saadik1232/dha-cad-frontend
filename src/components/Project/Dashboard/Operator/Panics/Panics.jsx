import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import Circle from "react-circle";
import { connect } from "react-redux";
import {
  UserLogout,
  GetPanics,
  GetCenter,
} from "./../../../../../actions/index";

const Panics = (props) => {
  const init = async () => {
    await props.getPanics();
  };

  useEffect(() => {
    init();
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
                <Circle
                  progress={
                    (Number(props.inQueryPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  progressColor="red"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                In Query
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.confirmedByOperatorPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Operator Confirmed
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.assignedToResponderPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  progressColor="green"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Assigned Responder
              </div>
              <div className="col-md-12">
                {" "}
                <br />{" "}
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.confirmedByResponderPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Responder Confirmed
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.resolvedByResponderPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Responder Resolved
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.resolvedByOperatorPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Operator Resolved
              </div>
              <div className="col-md-12">
                {" "}
                <br />{" "}
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.closedBySupervisorPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Supervisor Closed
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.closedByCustomerPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
                />
                Customer Closed
              </div>
              <div className="col-md-4">
                <Circle
                  progress={
                    (Number(props.cancelledPanics.length) /
                      Number(props.panics.length)) *
                    100
                  }
                  size={90}
                  animate={true}
                  animationDuration="1s"
                  animate={true}
                  animationDuration="1s"
                  progressColor="#369"
                  bgColor="#eee"
                  textStyle={{
                    fontSize: "70px",
                    fontWeight: "bold",
                  }}
                  roundedStroke={true}
                  showPercentageSymbol={false}
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
  panics: state.panics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
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
  cancelledPanics: state.cancelledPanics.filter(
    (item) => item.operatorInvolved == state.logger.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getPanics: () => GetPanics(dispatch),
  getCenter: (data) => GetCenter(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panics);

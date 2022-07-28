import React, { useEffect, useRef } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Circle from "react-circle";
import { connect } from "react-redux";
import {
  UserLogout,
  GetPanics,
  GetCenter,
} from "./../../../../../actions/index";

const Panics = (props) => {
  console.log("Supervisor - Panics Widget");

  const panicWidget = useRef("");
  const inQueryWidget = useRef("");
  const confirmedByOperatorWidget = useRef("");
  const assignedToResponderWidget = useRef("");
  const confirmedByResponderWidget = useRef("");
  const resolvedByResponderWidget = useRef("");
  const resolvedByOperatorWidget = useRef("");
  const closedBySupervisorWidget = useRef("");
  const closedByCustomerWidget = useRef("");
  const cancelledWidget = useRef("");
  const closedWidget = useRef("");

  const init = async () => {
    // await props.getPanics();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  const getTableData = (data) => {
    return data.reverse().map((item, index) => {
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
            <td> {item.createdAt} </td>
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
                <th> Date </th>
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
    const data2 = data.filter(function (res) {
      return res.panicType == "emergency";
    });
    if (data2.length > 0) {
      return (Number(data2.length) / Number(props.panics.length)) * 100;
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
    const data2 = data.filter(function (data) {
      return data.panicType == "emergency";
    });
    return Number(data2.length) == 0 ? "0" : Number(data2.length);
  };

  return (
    <>
      <div style={{ overflow: "auto", height: "100vh" }}>
        <div>
          {/* <PieChart
            data={[
              { title: "One", value: 1, color: "darkblue" },
              { title: "One", value: 2, color: "blue" },
              { title: "Two", value: 3, color: "cyan" },
              { title: "Three", value: 4, color: "skyblue" },
              { title: "Four", value: 5, color: "lightblue" },
              { title: "Four", value: 6, color: "#eee" },
              { title: "Four", value: 7, color: "#339" },
              { title: "Four", value: 8, color: "#366" },
              { title: "Four", value: 9, color: "#369" },
            ]}
          /> */}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              panicWidget.current.style.display == "none" ||
              panicWidget.current.style.display == ""
            ) {
              panicWidget.current.style.display = "block";
            } else {
              panicWidget.current.style.display = "none";
            }
          }}
        >
          <center>
            {" "}
            Panic Reports&nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <center
          ref={panicWidget}
          className="inverse-theme"
          style={{ padding: "5px", display: "block" }}
        >
          <div className="" style={{ width: "350px" }}>
            <div className="row">
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.inQueryPanics)}
                  text={panicLengthString(props.inQueryPanics)}
                  styles={getStyles("#369")}
                />
                In Query
              </div>
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.confirmedByOperatorPanics)}
                  text={panicLengthString(props.confirmedByOperatorPanics)}
                  styles={getStyles("#369")}
                />
                Operator Confirmed
              </div>
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.assignedToResponderPanics)}
                  text={panicLengthString(props.assignedToResponderPanics)}
                  styles={getStyles("#369")}
                />
                Assigned Responder
              </div>

              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.confirmedByResponderPanics)}
                  text={panicLengthString(props.confirmedByResponderPanics)}
                  styles={getStyles("#369")}
                />
                Responder Confirmed
              </div>
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.resolvedByResponderPanics)}
                  text={panicLengthString(props.resolvedByResponderPanics)}
                  styles={getStyles("#369")}
                />
                Responder Resolved
              </div>
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.resolvedByOperatorPanics)}
                  text={panicLengthString(props.resolvedByOperatorPanics)}
                  styles={getStyles("#369")}
                />
                Operator Resolved
              </div>

              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.closedBySupervisorPanics)}
                  text={panicLengthString(props.closedBySupervisorPanics)}
                  styles={getStyles("#369")}
                />
                Supervisor Closed
              </div>
              <div className="col-md-3">
                <CircularProgressbar
                  value={getLength(props.closedByCustomerPanics)}
                  text={panicLengthString(props.closedByCustomerPanics)}
                  styles={getStyles("#369")}
                />
                Customer Closed
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.panics)}
                  text={panicLengthString(props.panics)}
                  styles={getStyles("#369")}
                />
                Total
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.cancelledPanics)}
                  text={panicLengthString(props.cancelledPanics)}
                  styles={getStyles("#369")}
                />
                Cancelled
              </div>
              <div className="col-md-4">
                <CircularProgressbar
                  value={getLength(props.closedPanics)}
                  text={panicLengthString(props.closedPanics)}
                  styles={getStyles("#369")}
                />
                Closed
              </div>
            </div>
          </div>
          &nbsp; <i className="fa fa-caret-down"></i>{" "}
        </center>

        {/* <h4
          style={{ padding: "5px",   }}
          onClick={() =>
            props.getCenter(
              props.panics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center> All Panics&nbsp; <i className="fa fa-caret-down" ></i> </center>
        </h4>
        <div style={{ marginLeft: "15px" }}>{getTable(props.panics)}</div> */}
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              inQueryWidget.current.style.display == "none" ||
              inQueryWidget.current.style.display == ""
            ) {
              inQueryWidget.current.style.display = "block";
            } else {
              inQueryWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.inQueryPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            InQuery Panics&nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={inQueryWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.inQueryPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              confirmedByOperatorWidget.current.style.display == "none" ||
              confirmedByOperatorWidget.current.style.display == ""
            ) {
              confirmedByOperatorWidget.current.style.display = "block";
            } else {
              confirmedByOperatorWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.confirmedByOperatorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Confirmed By Operator Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={confirmedByOperatorWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.confirmedByOperatorPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              assignedToResponderWidget.current.style.display == "none" ||
              assignedToResponderWidget.current.style.display == ""
            ) {
              assignedToResponderWidget.current.style.display = "block";
            } else {
              assignedToResponderWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.assignedToResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Assigned To Responder Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={assignedToResponderWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.assignedToResponderPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              confirmedByResponderWidget.current.style.display == "none" ||
              confirmedByResponderWidget.current.style.display == ""
            ) {
              confirmedByResponderWidget.current.style.display = "block";
            } else {
              confirmedByResponderWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.confirmedByResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Confirmed By Responder Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={confirmedByResponderWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.confirmedByResponderPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              resolvedByResponderWidget.current.style.display == "none" ||
              resolvedByResponderWidget.current.style.display == ""
            ) {
              resolvedByResponderWidget.current.style.display = "block";
            } else {
              resolvedByResponderWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.resolvedByResponderPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Resolved By Responder Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={resolvedByResponderWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.resolvedByResponderPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              resolvedByOperatorWidget.current.style.display == "none" ||
              resolvedByOperatorWidget.current.style.display == ""
            ) {
              resolvedByOperatorWidget.current.style.display = "block";
            } else {
              resolvedByOperatorWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.resolvedByOperatorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Resolved By Operator Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={resolvedByOperatorWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.resolvedByOperatorPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              closedBySupervisorWidget.current.style.display == "none" ||
              closedBySupervisorWidget.current.style.display == ""
            ) {
              closedBySupervisorWidget.current.style.display = "block";
            } else {
              closedBySupervisorWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.closedBySupervisorPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Closed By Supervisor Panics&nbsp;{" "}
            <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={closedBySupervisorWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.closedBySupervisorPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              closedByCustomerWidget.current.style.display == "none" ||
              closedByCustomerWidget.current.style.display == ""
            ) {
              closedByCustomerWidget.current.style.display = "block";
            } else {
              closedByCustomerWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.closedByCustomerPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Closed By Customer Panics&nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={closedByCustomerWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.closedByCustomerPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              cancelledWidget.current.style.display == "none" ||
              cancelledWidget.current.style.display == ""
            ) {
              cancelledWidget.current.style.display = "block";
            } else {
              cancelledWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.cancelledPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Cancelled Panics&nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div
          ref={cancelledWidget}
          style={{ marginLeft: "15px", display: "none" }}
        >
          {getTable(props.closedPanics)}
        </div>
        <h4
          style={{ padding: "5px" }}
          onClick={() => {
            if (
              closedWidget.current.style.display == "none" ||
              closedWidget.current.style.display == ""
            ) {
              closedWidget.current.style.display = "block";
            } else {
              closedWidget.current.style.display = "none";
            }
          }}
          onDoubleClick={() =>
            props.getCenter(
              props.cancelledPanics.map((item) => {
                return { latitude: item.lat, longitude: item.lng };
              })
            )
          }
        >
          <center>
            {" "}
            Closed Panics&nbsp; <i className="fa fa-caret-down"></i>{" "}
          </center>
        </h4>
        <hr style={{ padding: 0, margin: 0 }} />
        <div ref={closedWidget} style={{ marginLeft: "15px", display: "none" }}>
          {getTable(props.closedPanics)}
        </div>
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
  closedPanics: state.closedPanics,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  // getPanics: () => GetPanics(dispatch),
  getCenter: (data) => GetCenter(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panics);

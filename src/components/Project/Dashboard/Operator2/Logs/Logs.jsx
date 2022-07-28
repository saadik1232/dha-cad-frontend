import React, { useEffect, useState } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
// import {  } from './../../../../../actions/index'
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import ReactTimeAgo from "react-time-ago";
JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

const compareDate = (date1, date2, type = "equal") => {
  let x = new Date(date1);
  let y = new Date(date2);
  if (type == "greater") {
    return +x > +y;
  } else if (type == "lesser") {
    return +x < +y;
  } else {
    return +x == +y;
  }
};

const Logs = (props) => {
  console.log("Supervisor - Event Logs");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const init = async () => {
    // await props.getPanics();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  // const filterNature = (id) => {
  //   let data = props.natures.filter((item) => item.id == id);
  //   if (data.length > 0) {
  //     return data[0];
  //   } else {
  //     return null;
  //   }
  // };

  // const filterPriority = (id) => {
  //   let data = props.priorities.filter((item) => item.id == id);
  //   if (data.length > 0) {
  //     return data[0];
  //   } else {
  //     return null;
  //   }
  // };

  const filterResponders = (id) => {
    let data = props.online.filter((item) => item.id == id);
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

  const getTableData = (data) => {
    return data.reverse().map((item, index) => {
      let color = item.isCancelled ? "red" : "transparent";
      if (start == "" || end == "") {
        return (
          <React.Fragment key={index}>
            <tr style={{ background: color }}>
              <td> {item.id} </td>
              <td> {item.contact} </td>
              <td> {item.nature.name} </td>
              <td> {item.priority.name} </td>
              <td> {item.lat} </td>
              <td> {item.lng} </td>
              <td> {item.isCancelled ? "Yes" : "No"} </td>
              <td>
                {filterOperators(item.operatorInvolved) == null
                  ? null
                  : filterOperators(item.operatorInvolved).firstname}
              </td>
              <td>
                {filterSupervisors(item.supervisorInvolved) == null
                  ? null
                  : filterSupervisors(item.supervisorInvolved).firstname}
              </td>
              <td>
                {" "}
                {filterResponders(item.responderInvolved) == null
                  ? null
                  : filterResponders(item.responderInvolved).name}{" "}
              </td>
              <td>
                {item.createdAt && (
                  <ReactTimeAgo date={new Date(item.createdAt)} />
                )}
              </td>
              <td>
                {item.panicConfirmedOprDate && (
                  <ReactTimeAgo date={new Date(item.panicConfirmedOprDate)} />
                )}
              </td>
              <td>
                {item.panicConfirmedSuprDate && (
                  <ReactTimeAgo date={new Date(item.panicConfirmedSuprDate)} />
                )}
              </td>
              <td>
                {item.panicAssignedResDate && (
                  <ReactTimeAgo date={new Date(item.panicAssignedResDate)} />
                )}
              </td>
              <td>
                {item.panicConfirmedResDate && (
                  <ReactTimeAgo date={new Date(item.panicConfirmedResDate)} />
                )}
              </td>
              <td>
                {item.panicResolvedResDate && (
                  <ReactTimeAgo date={new Date(item.panicResolvedResDate)} />
                )}
              </td>
              <td>
                {item.panicResolvedOprDate && (
                  <ReactTimeAgo date={new Date(item.panicResolvedOprDate)} />
                )}
              </td>
              <td>
                {item.panicClosedSuprDate && (
                  <ReactTimeAgo date={new Date(item.panicClosedSuprDate)} />
                )}
              </td>
              <td>
                {item.panicClosedCusDate && (
                  <ReactTimeAgo date={new Date(item.panicClosedCusDate)} />
                )}
              </td>
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
      } else {
        if (
          compareDate(item.createdAt, start, "greator") &&
          compareDate(item.createdAt, end, "lesser")
        ) {
          return (
            <React.Fragment key={index}>
              <tr style={{ background: color }}>
                <td> {item.id} </td>
                <td> {item.contact} </td>
                <td> {item.nature.name} </td>
                <td> {item.priority.name} </td>
                <td> {item.lat} </td>
                <td> {item.lng} </td>
                <td> {item.isCancelled ? "Yes" : "No"} </td>
                <td>
                  {filterOperators(item.operatorInvolved) == null
                    ? null
                    : filterOperators(item.operatorInvolved).firstname}
                </td>
                <td>
                  {filterSupervisors(item.supervisorInvolved) == null
                    ? null
                    : filterSupervisors(item.supervisorInvolved).firstname}
                </td>
                <td>
                  {" "}
                  {filterResponders(item.responderInvolved) == null
                    ? null
                    : filterResponders(item.responderInvolved).name}{" "}
                </td>
                <td>
                  {item.createdAt && (
                    <ReactTimeAgo date={new Date(item.createdAt)} />
                  )}
                </td>
                <td>
                  {item.panicConfirmedOprDate && (
                    <ReactTimeAgo date={new Date(item.panicConfirmedOprDate)} />
                  )}
                </td>
                <td>
                  {item.panicConfirmedSuprDate && (
                    <ReactTimeAgo
                      date={new Date(item.panicConfirmedSuprDate)}
                    />
                  )}
                </td>
                <td>
                  {item.panicAssignedResDate && (
                    <ReactTimeAgo date={new Date(item.panicAssignedResDate)} />
                  )}
                </td>
                <td>
                  {item.panicConfirmedResDate && (
                    <ReactTimeAgo date={new Date(item.panicConfirmedResDate)} />
                  )}
                </td>
                <td>
                  {item.panicResolvedResDate && (
                    <ReactTimeAgo date={new Date(item.panicResolvedResDate)} />
                  )}
                </td>
                <td>
                  {item.panicResolvedOprDate && (
                    <ReactTimeAgo date={new Date(item.panicResolvedOprDate)} />
                  )}
                </td>
                <td>
                  {item.panicClosedSuprDate && (
                    <ReactTimeAgo date={new Date(item.panicClosedSuprDate)} />
                  )}
                </td>
                <td>
                  {item.panicClosedCusDate && (
                    <ReactTimeAgo date={new Date(item.panicClosedCusDate)} />
                  )}
                </td>
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
        } else {
          return null;
        }
      }
    });
  };

  const getTable = (data) => {
    return (
      <React.Fragment>
        <div
          style={{ overflow: "auto", fontSize: "11px" }}
          className="inverse-theme"
        >
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Contact </th>
                <th> Nature </th>
                <th> Priority </th>
                <th> Lat </th>
                <th> Lng </th>
                <th> Cancelled </th>
                <th> Operator </th>
                <th> Supervisor </th>
                <th> Responder </th>
                <th> Generated </th>
                <th> Confirmed By Operator </th>
                <th> Confirmed By Supervisor </th>
                <th> Assigned To Responder </th>
                <th> Confirmed Responder </th>
                <th> Resolved By Responder </th>
                <th> Resolved By Operator </th>
                <th> Closed By Supervisor </th>
                <th> Closed By Customer </th>
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
      <Modal
        close={false}
        big={true}
        name={"logs"}
        title={{ name: "Logs", symbol: "check" }}
      >
        <div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">
                {" "}
                <b> From </b>{" "}
              </label>
              <input
                type="date"
                className="form-control"
                placeholder=" From : 00/00/0000 "
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">
                {" "}
                <b> To </b>{" "}
              </label>
              <input
                type="date"
                className="form-control"
                placeholder=" To : 00/00/0000 "
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        {getTable(props.panics)}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  // natures: state.natures,
  // priorities: state.priorities,
  online: state.onlineResponders,
  offline: state.offlineResponders,
  unknown: state.unknownResponders,
  panics: state.panics,
  operators: state.operators,
  supervisors: state.supervisors,
  // inQueryPanics: state.inQueryPanics,
  // confirmedByOperatorPanics: state.confirmedByOperatorPanics,
  // assignedToResponderPanics: state.assignedToResponderPanics,
  // confirmedByResponderPanics: state.confirmedByResponderPanics,
  // resolvedByResponderPanics: state.resolvedByResponderPanics,
  // resolvedByOperatorPanics: state.resolvedByOperatorPanics,
  // closedBySupervisorPanics: state.closedBySupervisorPanics,
  // closedByCustomerPanics: state.closedByCustomerPanics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Logs);

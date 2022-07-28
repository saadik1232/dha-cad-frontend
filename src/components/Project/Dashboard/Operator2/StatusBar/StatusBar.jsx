import React, { useState } from "react";
import { connect } from "react-redux";
import Reports from "../Reports/Reports";

const StatusBar = (props) => {
  console.log("Supervisor - Status Bar");

  const [open, setOpen] = useState(false);

  const getSelection = () => {
    if (open) {
      return (
        <>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">{props.panics.length} </span>
            &nbsp; Panics
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.cancelledPanics.length}{" "}
            </span>
            &nbsp; Cancelled Panics
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.confirmedByOperatorPanics.length}{" "}
            </span>
            &nbsp; Confirmed By Operator
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.assignedToResponderPanics.length}{" "}
            </span>
            &nbsp; Assigned To Responder
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.confirmedByResponderPanics.length}{" "}
            </span>
            &nbsp; Confirmed By Responder
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.resolvedByResponderPanics.length}{" "}
            </span>
            &nbsp; Resolved By Responder
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.resolvedByOperatorPanics.length}{" "}
            </span>
            &nbsp; Resolved By Operator
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.closedBySupervisorPanics.length}{" "}
            </span>
            &nbsp; Closed By Supervisor
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">
              {props.closedByCustomerPanics.length}{" "}
            </span>
            &nbsp; Closed By Customer
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">{props.offline.length} </span>
            &nbsp; Offline Responders
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">{props.unknown.length} </span>
            &nbsp; Unknown Responders
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <span className="badge inverse-theme">{props.online.length} </span>
            &nbsp; Online Responders:
          </div>
        </>
      );
    } else {
      return (
        <>
          <span>
            <center>
              <i className="fa fa-arrow-down"></i>
            </center>
          </span>
        </>
      );
    }
  };
  return null;
  return (
    <>
      <div className="container-fluid theme">
        <div className="" style={{ padding: "10px" }}>
          <div
            className="row"
            style={{
              borderLeft: "1px solid #fff",
              borderRight: "1px solid #fff",
              padding: "0px 0px 0px 0px",
            }}
            onClick={() => setOpen((item) => !item)}
          >
            {getSelection()}
          </div>
        </div>
      </div>
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
  cancelledPanics: state.panics.filter(
    (item) =>
      item.operatorInvolved == state.logger.id && item.isCancelled == true
  ),
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);

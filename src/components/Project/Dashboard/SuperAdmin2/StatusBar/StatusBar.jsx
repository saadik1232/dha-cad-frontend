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
              <i className="fa fa-caret-down"></i>
            </center>
          </span>
        </>
      );
    }
  };

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
  panics: state.panics,
  // operators: state.operators,
  // supervisors: state.supervisors,
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);

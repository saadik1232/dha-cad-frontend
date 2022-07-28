import React, { useState } from "react";
import { connect } from "react-redux";
import Reports from "../Reports/Reports";

const StatusBar = (props) => {
  const [open, setOpen] = useState(false);

  const getSelection = () => {
    if (open) {
      return (
        <>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Panics:: &nbsp;
            <span className="badge inverse-theme">{props.panics.length} </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Cancelled Panics: &nbsp;
            <span className="badge inverse-theme">
              {props.cancelledPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Confirmed By Operator: &nbsp;
            <span className="badge inverse-theme">
              {props.confirmedByOperatorPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Assigned To Responder: &nbsp;
            <span className="badge inverse-theme">
              {props.assignedToResponderPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Confirmed By Responder: &nbsp;
            <span className="badge inverse-theme">
              {props.confirmedByResponderPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Resolved By Responder: &nbsp;
            <span className="badge inverse-theme">
              {props.resolvedByResponderPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Resolved By Operator: &nbsp;
            <span className="badge inverse-theme">
              {props.resolvedByOperatorPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Closed By Supervisor: &nbsp;
            <span className="badge inverse-theme">
              {props.closedBySupervisorPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Closed By Customer: &nbsp;
            <span className="badge inverse-theme">
              {props.closedByCustomerPanics.length}{" "}
            </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Offline Responders: &nbsp;
            <span className="badge inverse-theme">{props.offline.length} </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Unknown Responders: &nbsp;
            <span className="badge inverse-theme">{props.unknown.length} </span>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            Online Responders: &nbsp;
            <span className="badge inverse-theme">{props.online.length} </span>
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

  return (
    <>
      <div className="container-fluid theme">
        <div
          className="row"
          style={{
            borderLeft: "1px solid #fff",
            borderRight: "1px solid #fff",
            padding: "8px 0px 8px 0px",
          }}
          onClick={() => setOpen((item) => !item)}
        >
          {getSelection()}
        </div>
      </div>
    </>
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

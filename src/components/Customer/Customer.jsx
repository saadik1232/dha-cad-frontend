import React from "react";
import { connect } from "react-redux";
import * as Actions from "../../store/actions/panicActions";

const Customer = props => {
  const user = props.verify();
  return (
    <React.Fragment>
      <header>
        <div id="topBar">
          <span>&nbsp;&nbsp;</span>
          <b> C.A.D. ( Customer Dashoard ) </b>
          <span className="pullRight">
            <span>&nbsp;</span>
            <i className="fa fa-power-off" onClick={() => props.logout()}></i>
            <span>&nbsp;</span>
          </span>
        </div>
      </header>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="img-responsive"
              />
            </div>
            <div>
              <h1> {user.firstname + " " + user.lastname} </h1>
            </div>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-block btn-lg btn-primary sharp-border"
              onClick={() =>
                props.onPanicGenerate({
                  natureId: 1,
                  priorityId: 3,
                  statusId: 1,
                  address: "",
                  lat: "31.4676",
                  long: "74.3072",
                  contact: user.contact
                })
              }
            >
              Emergency ( On Shake )
            </button>
            <button
              className="btn btn-block btn-primary sharp-border"
              onClick={() =>
                props.onPanicGenerate({
                  natureId: 2,
                  priorityId: 2,
                  statusId: 1,
                  address: "",
                  lat: "31.4760",
                  long: "74.3045",
                  contact: user.contact
                })
              }
            >
              Emergency ( On Button Click )
            </button>
            <button
              className="btn btn-block btn-primary sharp-border"
              onClick={() =>
                props.onPanicGenerate({
                  natureId: 3,
                  priorityId: 2,
                  statusId: 1,
                  address: "",
                  lat: "31.4805",
                  long: "74.3239",
                  contact: user.contact
                })
              }
            >
              Fire Alarm
            </button>
            <button className="btn btn-block btn-primary sharp-border">
              Robbery
            </button>
            <button className="btn btn-block btn-primary sharp-border">
              Medical
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    panics: state.Panics.panics
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPanicGenerate: panic => dispatch(Actions.generatePanic(panic))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);

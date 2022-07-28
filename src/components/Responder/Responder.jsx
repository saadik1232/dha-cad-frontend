import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { geolocated } from "react-geolocated";
import Map from "../Operator/Map/Map";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import GoogleMaps from "../GoogleMaps";
import { URL } from "../../config/config";

const Responder = props => {
  const user = props.verify();
  const timer = 2000;
  const [assigned, setAssigned] = useState(-1);
  const checkAssignment = () => {
    var url = URL + "/auth/responder/status";
    var data = {
      id: user.contact
    };
    axios
      .post(url, data)
      .then(response => {
        if (response.data) {
          var info = response.data.result.data;

          setAssigned(info.responder_status);
        }
      })
      .catch(e => {
        console.log("Error !");
      });
  };

  const confirmAssignment = () => {
    var url = URL + "/auth/responder/confirm";
    var data = {
      id: user.contact
    };
    axios
      .post(url, data)
      .then(response => {
        if (response.data) {
          var info = response.data.result.data;
          if (info) {
            ToastsStore.success("Panic Confirmed Successfully !");
          }
        }
      })
      .catch(e => {
        console.log("Error !");
      });
  };

  const confirmButton = () => {
    if (assigned == 0) {
      return (
        <React.Fragment>
          <button
            className="btn btn-block btn-primary sharp-border"
            onClick={() => confirmAssignment()}
          >
            Confirm Assignment
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const resolveAssignment = () => {
    var url = URL + "/auth/responder/resolve";
    var data = {
      id: user.contact
    };
    axios
      .post(url, data)
      .then(response => {
        if (response.data) {
          var info = response.data.result.data;
          if (info) {
            ToastsStore.success("Panic Resolved ... Congratulations !");
          }
        }
      })
      .catch(e => {
        console.log("Error !");
      });
  };

  const resolveButton = () => {
    if (assigned != 0) {
      return (
        <React.Fragment>
          <button
            className="btn btn-block btn-success sharp-border"
            onClick={() => resolveAssignment()}
          >
            Resolve Assignment
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  const getDashboard = () => {
    if (assigned == 0 || assigned == 1) {
      return (
        <React.Fragment>
          <div
            className="container"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <br />
            <br />
            <div className="row">
              <div className="col-md-4">
                {confirmButton()}

                {resolveButton()}
                <br />
                <div className="panel panel-primary sharp-border">
                  <div className="panel-heading sharp-border">
                    Panic - Address Details
                  </div>
                  <div className="panel-body">Demo Address here ...</div>
                </div>
                <div className="panel panel-primary sharp-border">
                  <div className="panel-heading sharp-border">
                    Operator Involved
                  </div>
                  <div className="panel-body">Demo Operator here ...</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    setInterval(() => {
      checkAssignment();
    }, timer);
  }, ["text"]);

  return (
    <React.Fragment>
      <Header logout={props.logout} />
      <main>
        <GoogleMaps latitude={30} longitude={71} />
      </main>
      <div className="clearfix"></div>

      {getDashboard()}
    </React.Fragment>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Responder);

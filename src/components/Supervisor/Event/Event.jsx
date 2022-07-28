import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import { URL } from "../../../config/config";

const Event = props => {
  const [id, setId] = useState(props.event.id);
  const [contact, setContact] = useState(props.event.contact);
  const [address, setAddress] = useState(props.event.address);
  const [lat, setLat] = useState(props.event.lat);
  const [long, setLong] = useState(props.event.long);
  const [natureId, setNatureId] = useState(props.event.natureId);
  const [priorityId, setPriorityId] = useState(props.event.priorityId);

  const getNatures = () => {
    return props.natures.map(n => {
      return (
        <option key={n.id} value={n.id}>
          {n.name}
        </option>
      );
    });
  };

  const getPriorities = () => {
    return props.priorities.map(n => {
      return (
        <option key={n.id} value={n.id}>
          {n.name}
        </option>
      );
    });
  };

  const submitEvent = async () => {
    var url = URL + "/panics/" + id + "/confirmed";
    await axios
      .get(url)
      .then(async response => {
        if (response.data) {
          if (response.data.result.status == 200) {
            ToastsStore.success("Event Confirmed Successfully !");
            props.setEventHide(!props.eventHide);
            props.setDisplaysHide(false);
          } else {
            console.log("Error 1 !");
          }
        } else {
          console.log("Error 2 !");
        }
      })
      .catch(e => {
        console.log("Error 3 !");
      });
  };

  return (
    <React.Fragment>
      <div id="event">
        <div id="bar">
          <br />
        </div>
        <div id="bar2">
          <span>&nbsp;</span>
          <i className="fa fa-tags"></i>
          &nbsp;&nbsp; Events
          <span className="pull-right">
            <i className="fa fa-refresh"></i>
            &nbsp;&nbsp;
            <i className="fa fa-save"></i>
            &nbsp;&nbsp;
            <i className="fa fa-remove"></i>
          </span>
        </div>
        <div id="form">
          <div id="levels">
            <span>
              <i className="fa fa-circle"></i>
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-circle-thin"></i>
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-circle-thin"></i>
            </span>
            &nbsp;&nbsp;
            <span>
              <i className="fa fa-circle-thin"></i>
            </span>
          </div>
          <div className="fields">
            <div className="form-group">
              <label> Contact </label>
              <input
                type="text"
                placeholder=" #### - ####### "
                className="form-control sharp-border"
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label> Address </label>
              <input
                type="text"
                placeholder=" Enter Address ... "
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="form-control sharp-border"
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label> Latitude </label>
                  <input
                    type="text"
                    placeholder=" 31.394857 "
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    className="form-control sharp-border"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label> Longitude </label>
                  <input
                    type="text"
                    placeholder=" 71.348957 "
                    value={long}
                    onChange={e => setLong(e.target.value)}
                    className="form-control sharp-border"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label> Nature Id </label>
              <select
                className="form-control"
                value={natureId}
                onChange={e => setNatureId(e.target.value)}
                className="form-control sharp-border"
              >
                {getNatures()}
              </select>
            </div>
            <div className="form-group">
              <label> Priority Id </label>
              <select
                className="form-control"
                value={priorityId}
                onChange={e => setPriorityId(e.target.value)}
              >
                {getPriorities()}
              </select>
            </div>
            <br />
            <br />
            <div className="">
              <button
                className="btn btn-primary sharp-border pull-right"
                onClick={() => {
                  submitEvent();
                }}
              >
                Accept
              </button>

              <div className="cleafix"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Event;

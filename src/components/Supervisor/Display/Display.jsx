import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import { URL } from "../../../config/config";

const Display = props => {
  const timer = 2000;
  const [confirmed, setConfirmed] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [responders, setResponders] = useState([]);
  const [res, setRes] = useState(0);
  const getNature = id => {
    var info = props.natures.filter(p => p.id == id);
    if (info.length > 0) {
      return info[0];
    } else {
      return null;
    }
  };
  const getPriority = id => {
    var info = props.priorities.filter(p => p.id == id);
    if (info.length > 0) {
      return info[0];
    } else {
      return null;
    }
  };
  const getAssignment = async (id, cb) => {
    var url = URL + "/panics/" + id + "/assignments";
    await axios
      .get(url)
      .then(async response => {
        if (response.data) {
          var info = await response.data.result.data;
          var resp = await getResponder(info);
          // console.log("P: ", resp);
          cb(resp);
        }
      })
      .catch(e => {
        console.log("Error !");
      });
  };
  const getConfirmed = () => {
    var url = URL + "/panics/assignments";
    axios
      .get(url)
      .then(async response => {
        if (response.data) {
          var info = response.data.result.data;
          var info2 = info.filter(i => i.panic.statusId == 3);
          var info3 = info.filter(i => i.panic.statusId == 4);
          var info4 = info.filter(i => i.panic.statusId == 5);

          if (info2.length > 0) {
            await setConfirmed(info2);
          }
          if (info3.length > 0) {
            await setAssigned(info3);
          }
          if (info4.length > 0) {
            await setResolved(info4);
          }
          // console.log(info3);
        }
      })
      .catch(e => {
        console.log("Error234 !");
      });
  };
  const getResponder = id => {
    var r = responders.filter(r => r.id == id);
    if (r.length > 0) {
      return r[0];
    } else {
      return null;
    }
  };
  const getResponders = () => {
    var url = URL + "/auth/users/all";
    axios
      .get(url)
      .then(async response => {
        if (response.data) {
          var info = response.data.result.data;
          info = await info.filter(i => i.roleId == 4);
          setResponders(info);
        }
      })
      .catch(e => {
        console.log("Error !");
      });
  };
  const displayConfirmed = () => {
    return confirmed.map(c => {
      return (
        <React.Fragment>
          <tr key={c.id}>
            <td> {c.panic.id} </td>
            <td> {c.panic.contact} </td>
            <td> {c.panic.address} </td>

            <td>
              {getNature(c.panic.natureId) != null
                ? getNature(c.panic.natureId).name
                : null}
            </td>
            <td>
              {getPriority(c.panic.priorityId) != null
                ? getPriority(c.panic.priorityId).name
                : null}
            </td>
            <td>
              <select
                className="form-control sharp-border"
                value={res}
                onChange={e => setRes(e.target.value)}
              >
                <option value="0"> None </option>
                {displayResponders()}
              </select>
            </td>
            <td>
              <button
                className="btn btn-primary sharp-border"
                onClick={() => assignForm(c.panic.id)}
              >
                Assign
              </button>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };
  const displayAssigned = () => {
    return assigned.map(c => {
      return (
        <React.Fragment>
          <tr
            key={c.panic.id}
            style={{
              background:
                c.assignment[0].responder_status == 0 ? "gray" : "#eee"
            }}
          >
            <td>{c.panic.id}</td>
            <td> {c.panic.contact} </td>
            <td> {c.panic.address} </td>

            <td>
              {getNature(c.panic.natureId) != null
                ? getNature(c.panic.natureId).name
                : null}
            </td>
            <td>
              {getPriority(c.panic.priorityId) != null
                ? getPriority(c.panic.priorityId).name
                : null}
            </td>
            <td>
              {getResponder(c.assignment[0].responderId).firstname +
                " " +
                getResponder(c.assignment[0].responderId).lastname}
            </td>
            <td> {getResponder(c.assignment[0].responderId).contact}</td>
            <td> {getResponder(c.assignment[0].responderId).address}</td>
            <td>-</td>
          </tr>
        </React.Fragment>
      );
    });
  };
  const displayResolved = () => {
    return resolved.map(c => {
      return (
        <React.Fragment>
          <tr
            key={c.panic.id}
            style={{
              background:
                c.assignment[0].responder_status == 0 ? "gray" : "#eee"
            }}
          >
            <td>{c.panic.id}</td>
            <td> {c.panic.contact} </td>
            <td> {c.panic.address} </td>

            <td>
              {getNature(c.panic.natureId) != null
                ? getNature(c.panic.natureId).name
                : null}
            </td>
            <td>
              {getPriority(c.panic.priorityId) != null
                ? getPriority(c.panic.priorityId).name
                : null}
            </td>
            <td
              title={
                getResponder(c.assignment[0].responderId).lat +
                "," +
                getResponder(c.assignment[0].responderId).long
              }
            >
              {getResponder(c.assignment[0].responderId).firstname +
                " " +
                getResponder(c.assignment[0].responderId).lastname}
            </td>
            <td>-</td>
          </tr>
        </React.Fragment>
      );
    });
  };
  const displayResponders = () => {
    return responders.map(c => {
      return (
        <React.Fragment>
          <option key={c.id} value={c.id}>
            {c.firstname + " " + c.lastname}
          </option>
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    setInterval(() => {
      //setResponders([]);
      setAssigned([]);
      // setResolved([]);
      //setConfirmed([]);
      getResponders();
      getConfirmed();
    }, timer);
  }, ["text"]);
  const assignForm = id => {
    if (res != 0) {
      var url = URL + "/panics/" + id + "/assign";
      var data = {
        responderId: res
      };
      axios
        .post(url, data)
        .then(response => {
          if (response.data.result.status == 200) {
            ToastsStore.success("Panic Assigned Successfully !");
            setConfirmed([]);
            setResponders([]);
            getResponders();
            getConfirmed();
          }
        })
        .catch(e => {
          console.log("Error !");
        });
    } else {
      ToastsStore.warning("No Responder has Been Selected !");
    }
  };
  return (
    <React.Fragment>
      <div
        id="displays"
        class="displayRight sharp-border"
        style={{ display: !props.displaysHide ? "" : "none" }}
      >
        <div id="bar">
          <br />
        </div>
        <div class="panel sharp-border">
          <div class="bar">
            <div class="head">Pending Events </div>
            <div class="body">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Contact</th>
                    <th>Address</th>

                    <th>Nature</th>
                    <th>Priority</th>
                    <th>Responder</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>{displayConfirmed()}</tbody>
              </table>
            </div>
          </div>
          <div class="bar">
            <div class="head">Assigned Events</div>
            <div class="body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Contact</th>
                    <th>Address</th>

                    <th>Nature</th>
                    <th>Priority</th>
                    <th>Responder Name</th>
                    <th>Responder Contact</th>
                    <th>Responder Address</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>{displayAssigned()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        id="displays"
        class="displayRight sharp-border"
        style={{ display: !props.displaysHide2 ? "" : "none" }}
      >
        <div id="bar">
          <br />
        </div>
        <div class="panel sharp-border">
          <div class="bar">
            <div class="head">Resolved Events </div>
            <div class="body">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Contact</th>
                    <th>Address</th>

                    <th>Nature</th>
                    <th>Priority</th>
                    <th>Responder</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>{displayResolved()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Display;

import React, { useState, useEffect } from "react";
import {
  getServices,
  delService,
  addService,
  editService,
} from "../../../../requests/Service/Service";
import {
  getDevices,
  delDevice,
  addDevices,
  editDevices,
} from "./../../../../requests/Traccar/Devices/Devices";
import { ToastsStore } from "react-toasts";
import { Beep1 } from "../../../../Beeper/Beeper";

const AddResponder = (props) => {
  const [devices, setDevices] = useState([]);
  const [page, setPage] = useState("view");
  const [form, setForm] = useState("add");

  /**
   * Attributes
   */
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [positionId, setPositionId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [contact, setContact] = useState("");
  const [category, setcategory] = useState("");
  const [geofenceIds, setGeofenceIds] = useState([]);
  const [attributes, setAttributes] = useState({});
  // Database Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    if (page == "view") {
      setPage("add");
    } else {
      setPage("view");
    }
    setId(0);
    setName("");
    setPositionId("");
    setStatus("");
    setLastUpdate("");
    setUniqueId("");
    setForm("add");
  };

  const fetchDevices = () => {
    return devices.map((s) => {
      var color = "";
      if (s.status == "offline") {
        color = "#F29F8D";
      } else if (s.status == "online") {
        color = "#CAF28D";
      } else if (s.status == "logged") {
        color = "#F2DA8D";
      } else if (s.status == "unknown") {
        color = "#ECF28D";
      } else {
        color = "#8DDBF2";
      }
      return (
        <React.Fragment key={s.id}>
          <tr style={{ background: color }}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.uniqueId}</td>
            <td>{s.status}</td>
            <td>{s.lastUpdate}</td>
            <td>{s.positionId}</td>
            <td>{s.phone}</td>
            <td>{s.disabled}</td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  toggle();
                  setId(s.id);
                  setName(s.name);
                  setUniqueId(s.uniqueId);
                  setPositionId(s.positionId);
                  setStatus(s.status);
                  setForm("edit");
                }}
              >
                <i className="fa fa-pencil"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  alert(s.uniqueId);
                  delDevice({ id: s.id, unique: s.uniqueId }, () =>
                    ToastsStore.success("Responder Removed Successfully !")
                  );
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    setInterval(() => {
      getDevices((data) => {
        setDevices(data);
      });
    }, 1000);
  }, []);

  const save = () => {
    if (name == "" || contact == "") {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        uniqueId,
        status,
        disabled,
        lastUpdate,
        positionId,
        groupId,
        phone,
        model,
        contact,
        category,
        geofenceIds,
        attributes,
      };
      addDevices(data, { password }, () => {
        toggle();
        Beep1();
        ToastsStore.success("Device has been Added Successfully !");
      });
    }
  };

  const edit = () => {
    if (name == "" || contact == "") {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        id,
        name,
        uniqueId,
        status,
        disabled,
        lastUpdate,
        positionId,
        groupId,
        phone,
        model,
        contact,
        category,
        geofenceIds,
        attributes,
      };
      editDevices(id, data, { password }, () => {
        toggle();
        Beep1();
        ToastsStore.success("Device has been Updated Successfully !");
      });
    }
  };

  const getView = () => {
    return (
      <React.Fragment>
        <div>
          <button className="btn btn-primary" onClick={toggle}>
            <i className="fa fa-plus"></i> Register New Responder
          </button>
          <br />
          <br />
          <div className="well">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Unique Id</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Position Id</th>
                  <th>Phone</th>
                  <th>Disabled</th>
                  <th> - </th>
                  <th> - </th>
                </tr>
              </thead>
              <tbody>{fetchDevices()}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const getAdd = () => {
    return (
      <React.Fragment>
        <div>
          <div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Unique Id"
                className="form-control"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Status"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Position Id"
                className="form-control"
                value={positionId}
                onChange={(e) => setPositionId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Contact"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary pull-left" onClick={toggle}>
              Back to View
            </button>
            {form == "add" ? (
              <button className="btn btn-primary pull-right" onClick={save}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary pull-right" onClick={edit}>
                Update
              </button>
            )}
            <div className="clearfix"></div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div style={{ overflow: "auto" }}>
        {page == "view" ? getView() : getAdd()}
      </div>
    </React.Fragment>
  );
};

export default AddResponder;

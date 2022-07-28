import React, { useState, useEffect } from "react";
import {
  getSubscriptions,
  addSubscription,
  delSubscription,
  updateSubscription,
} from "../../../../requests/Subscriptions/Subscriptions";
import {
  getServices,
  getFilteredServices,
} from "../../../../requests/Service/Service";
import { ToastsStore } from "react-toasts";
import { Beep1 } from "../../../../Beeper/Beeper";

const SubscriptionCrud = (props) => {
  const [subscription, setSubscription] = useState([]);
  const [page, setPage] = useState("view");
  const [form, setForm] = useState("add");
  const [service, setService] = useState([]);

  /**
   * Attributes
   */
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [duration, setDuration] = useState(0);
  const [usersAllowed, setUsersAllowed] = useState(0);
  const [devicesAllowed, setDevicesAllowed] = useState(0);
  const [serviceId, setServiceId] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getServices((data) => {
      setService(data);
    });
  }, []);

  const displayServices = () => {
    return service.map((c) => {
      return (
        <option key={c.id} value={c.id}>
          {c.name ? c.name.toUpperCase() : ""}
        </option>
      );
    });
  };

  const filterService = (id) => {
    var data = service.filter((c) => c.id == id);
    console.log(data[0]);
    if (data.length > 0) return data[0];
    else return null;
  };

  const toggle = () => {
    if (page == "view") {
      setPage("add");
    } else {
      setPage("view");
    }
    setId(0);
    setTitle("");
    setDescription("");
    setCost(0);
    setDuration(0);
    setUsersAllowed(0);
    setDevicesAllowed(0);
    setServiceId(0);
    setForm("add");
  };

  const fetchSubscription = () => {
    return subscription.map((s) => {
      var service = filterService(s.serviceId);
      return (
        <React.Fragment key={s.id}>
          <tr>
            <td>{s.id}</td>
            <td>{s.title}</td>
            <td>{s.description}</td>
            <td>{s.cost}</td>
            <td>{s.duration}</td>
            <td>{s.usersAllowed}</td>
            <td>{s.devicesAllowed}</td>
            <td>{service == null ? "" : service.name}</td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  toggle();
                  setId(s.id);
                  setTitle(s.title);
                  setDescription(s.description);
                  setCost(s.cost);
                  setDuration(s.duration);
                  setUsersAllowed(s.usersAllowed);
                  setDevicesAllowed(s.devicesAllowed);
                  setServiceId(s.serviceId);
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
                  delSubscription(s.id, () => {
                    ToastsStore.success("Subscription Deleted Successfully !");
                  });
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
      getSubscriptions((data) => {
        setSubscription(data);
      });
    }, 1000);
  }, [service]);

  const save = () => {
    if (
      title == "" ||
      description == "" ||
      cost == 0 ||
      cost == "0" ||
      duration == 0 ||
      duration == "0"
    ) {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        title,
        description,
        cost,
        duration,
        usersAllowed,
        devicesAllowed,
        serviceId,
        // userId: props.user.id,
      };
      addSubscription(data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Subscription has been Added Successfully !");
      });
    }
  };

  const edit = () => {
    if (
      title == "" ||
      description == "" ||
      cost == 0 ||
      cost == "0" ||
      duration == 0 ||
      duration == "0"
    ) {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        title,
        description,
        cost,
        duration,
        usersAllowed,
        devicesAllowed,
        serviceId,
        // userId: props.user.id,
      };
      updateSubscription(id, data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Subscription has been Updated Successfully !");
      });
    }
  };

  const getView = () => {
    return (
      <React.Fragment>
        <div>
          <button className="btn btn-primary" onClick={toggle}>
            <i className="fa fa-plus"></i> Add New Subscription
          </button>
          <br />
          <br />
          <div className="well">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Duration</th>
                  <th>Users Allowed</th>
                  <th>Devices Allowed</th>
                  <th>Services</th>

                  <th> - </th>
                  <th> - </th>
                </tr>
              </thead>
              <tbody>{fetchSubscription()}</tbody>
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
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder=" ### Rs "
              className="form-control"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder=" ( ### ) in Days ... "
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Users Allowed"
              className="form-control"
              value={usersAllowed}
              onChange={(e) => setUsersAllowed(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Devices Allowed"
              className="form-control"
              value={devicesAllowed}
              onChange={(e) => setDevicesAllowed(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              value={serviceId}
              onChange={(e) => {
                setServiceId(Number(e.target.value));
                getFilteredServices(Number(e.target.value), (data) => {
                  console.log(data);
                  setSelected(data);
                });
              }}
            >
              {displayServices()}
            </select>
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
    <React.Fragment>{page == "view" ? getView() : getAdd()}</React.Fragment>
  );
};

export default SubscriptionCrud;

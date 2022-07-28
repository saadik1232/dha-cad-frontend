import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GetSubscriptions,
  CreateSubscriptions,
  UpdateSubscriptions,
  UserLogout,
  GetServices,
} from "../../../../../../actions/index";

const Create = (props) => {
  console.log("Super Admin Groups Create");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userAllowed, setUserAllowed] = useState(0);
  const [deviceAllowed, setDeviceAllowed] = useState(0);

  const init = async () => {
    await props.getServices();
  };

  useEffect(() => {
    init();
    let data = props.subscriptions.filter((item) => item.id == props.id);
    data = data[0] || null;
    if (data != null) {
      setName(data.title);
      setDescription(data.description);
      setCost(data.cost);
      setDuration(data.duration);
      setUserAllowed(data.usersAllowed);
      setDeviceAllowed(data.devicesAllowed);
      setServiceId(data.serviceId);
    }
    return;
  }, []);

  const fetchServices = () => {
    return props.services.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <option value={item.id}> {item.name} </option>
        </React.Fragment>
      );
    });
  };

  const Empty = () => {
    if (props.id != "") {
      props.setId("");
    }
    setName("");
    setDescription("");
    setCost("");
    setDuration("");
    setUserAllowed("");
    setDeviceAllowed("");
    setServiceId("");
    // setGroupId("");
  };

  const save = async () => {
    if (props.id != "") {
      await props.updateSubscriptions(props.id, {
        title: name,
        description,
        cost,
        duration,
        usersAllowed: userAllowed,
        devicesAllowed: deviceAllowed,
        serviceId: Number(serviceId),
        // userId: 1, // Number(groupId) == 0 ? 1 : Number(groupId),
      });
    } else {
      await props.createSubscriptions({
        title: name,
        description,
        cost,
        duration,
        usersAllowed: userAllowed,
        devicesAllowed: deviceAllowed,
        serviceId: Number(serviceId),
        // userId: 1, // Number(groupId) == 0 ? 1 : Number(groupId),
      });
    }
    setTimeout(() => {
      props.getSubscriptions();
      Empty();
      props.setPage("main");
    }, 500);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder=" Enter Name "
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Description "
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Cost "
          className="form-control"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Duration "
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Users Allowed "
          className="form-control"
          value={userAllowed}
          onChange={(e) => setUserAllowed(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Devices Allowed "
          className="form-control"
          value={deviceAllowed}
          onChange={(e) => setDeviceAllowed(e.target.value)}
        />
        <br />
        <select
          className="form-control"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value=""> None </option>
          {fetchServices()}
        </select>
        <br />
        <div>
          <button className="btn btn-primary pull-right" onClick={save}>
            Save
          </button>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  services: state.services,
  // admin: state.admin,
  subscriptions: state.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getSubscriptions: () => GetSubscriptions(dispatch),
  getServices: () => GetServices(dispatch),
  createSubscriptions: (data) => CreateSubscriptions(dispatch, data),
  updateSubscriptions: (id, data) => UpdateSubscriptions(dispatch, id, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

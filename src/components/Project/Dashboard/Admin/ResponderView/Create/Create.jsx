import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GetAllResponder,
  CreateTraccarResponders,
  UpdateTraccarResponders,
  // CreateResponders,
  UserLogout,
  GetTraccarGroups,
} from "../../../../../../actions/index";
import _ from "lodash";
import uniqid from "uniqid";

const Create = (props) => {
  console.log("Supervisor - Traccar Reponders Create");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [groupId, setGroupId] = useState("");
  // const [duration, setDuration] = useState("");
  // const [serviceId, setServiceId] = useState("");
  // const [userAllowed, setUserAllowed] = useState(0);
  // const [deviceAllowed, setDeviceAllowed] = useState(0);

  const init = async () => {
    // await props.getServices();
  };

  useEffect(() => {
    // init();
    console.error("Create Panel");
    let data = props.traccarResponders.filter((item) => item.id == props.id);
    if (data.length > 0) {
      data = data[0] || null;
      if (data != null) {
        setName(data.title);
        setStatus(data.status);
        setPhone(data.phone);
        setGroupId(data.groupId);
        // setDuration(data.duration);
        // setUserAllowed(data.usersAllowed);
        // setDeviceAllowed(data.devicesAllowed);
        // setServiceId(data.serviceId);
      } else {
        // console.error("No Traccar Data");
      }
    } else {
      // console.error("No Traccar Found Error 2");
    }
    return;
  }, []);

  // const fetchServices = () => {
  //   return props.services.map((item, index) => {
  //     return (
  //       <React.Fragment key={index}>
  //         <option value={item.id}> {item.name} </option>
  //       </React.Fragment>
  //     );
  //   });
  // };

  const Empty = () => {
    if (id != "") {
      setId("");
    }
    setName("");
    setStatus("");
    setPhone("");
    setPassword("");
    setGroupId("");
    // setCost("");
    // setDuration("");
    // setUserAllowed("");
    // setDeviceAllowed("");
    // setServiceId("");
    // setGroupId("");
  };

  const getGroups = () => {
    return props.groups.reverse().map((item, index) => {
      return (
        <React.Fragment key={index}>
          <option value={item.id}> {item.name} </option>
        </React.Fragment>
      );
    });
  };

  const save = async () => {
    console.error("Saved: ", { name, status, phone, id });
    if (id != "") {
      await props.updateTraccarResponders(props.id, {
        name,
        status,
        phone,
        disabled: true,
        lastUpdate: new Date(),
        // positionId: 1,
        groupId: 1,
        model: "Dummy",
        contact: "",
        category: "",
        geofenceIds: [],
        attributes: {},
      });
    } else {
      console.error("Creating");
      await props.createTraccarResponders(
        {
          name,
          status,
          phone,
          uniqueId: Math.round(Math.random() * 1000000).toString(), // uniqid(),
          disabled: false,
          // lastUpdate: new Date(),
          // positionId: "0",
          // groupId: 1,
          model: "Dummy",
          contact: "",
          category: "",
          geofenceIds: [],
          attributes: {},
        },
        password
      );
      // await props.createResponders({
      //   firstname: name,
      //   lastname: name,
      //   contact: phone,
      //   password: password,
      // });
    }
    setTimeout(() => {
      props.getAllResponder();
      Empty();
      props.setPage("main");
    }, 1000);
  };

  const groupser = () => {
    let data = [...props.online, ...props.offline, ...props.unknown];
    let data3 = props.groups.filter(
      (item) => item.groupId == props.user.groupId
    );
    let data4 = data3.map((item) => item.id);
    // console.error("Data: ", data4);
    let data2 = data.filter((item) => {
      try {
        if (item.db != null) {
          if (_.includes(data4, item.db.groupId)) {
            // console.error(
            //   item.db.groupId,
            //   _.includes(data4, item.db.groupId)
            // );
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    });
    return data2;
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
          placeholder=" Enter Status "
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Phone "
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder=" Enter Password "
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <select
          className="form-control"
          // defaultValue={groupId}
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          // disabled
        >
          <option value=""> None </option>
          {getGroups()}
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
  groups: state.groups.filter((item) => item.groupId == state.logger.groupId),
  traccarResponders: [
    ...state.onlineResponders,
    ...state.unknownResponders,
    ...state.offlineResponders,
  ],
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getAllResponder: () => GetAllResponder(dispatch),
  createTraccarResponders: (data, pass) =>
    CreateTraccarResponders(dispatch, data, pass),
  // createResponders: (data) => CreateResponders(dispatch, data),
  updateTraccarResponders: (id, data) =>
    UpdateTraccarResponders(dispatch, id, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

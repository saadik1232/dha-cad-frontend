import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GetUsers,
  CreateAdmin,
  UpdateUsers,
  UserLogout,
} from "../../../../../../actions/index";

const Create = (props) => {
  console.log("Super Admin Groups Create");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    let data = props.admin.filter((item) => item.id == props.id);
    data = data[0] || null;
    if (data != null) {
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setContact(data.contact);
      setEmail(data.email);
      setPassword(data.password);
      setGroupId(data.groupId);
    }
    return;
  }, []);

  const getGroups = () => {
    return props.groups.map((item, index) => {
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
    setFirstname("");
    setLastname("");
    setContact("");
    setEmail("");
    setPassword("");
    setGroupId("");
  };

  const save = async () => {
    if (props.id != "") {
      await props.updateUsers(props.id, {
        firstname,
        lastname,
        contact,
        email,
        password,
        groupId,
      });
    } else {
      await props.createAdmin({
        firstname,
        lastname,
        contact,
        email,
        password,
        groupId,
      });
    }
    setTimeout(() => {
      props.getUsers();
      Empty();
      props.setPage("main");
    }, 300);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder=" Enter First Name "
          className="form-control"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Last Name "
          className="form-control"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Contact "
          className="form-control"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder=" Enter Email "
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
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
  groups: state.groups,
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getUsers: () => GetUsers(dispatch),
  createAdmin: (data) => CreateAdmin(dispatch, data),
  updateUsers: (id, data) => UpdateUsers(dispatch, id, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

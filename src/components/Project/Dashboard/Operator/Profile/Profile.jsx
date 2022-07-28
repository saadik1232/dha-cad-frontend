import React, { useState, useEffect } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
import {
  UpdateUsers,
  UserLogout,
  UserLogin,
} from "./../../../../../actions/index";

const Profile = (props) => {
  const [id, setId] = useState(props.user.id || 0);
  const [firstname, setFirstname] = useState(props.user.firstname || "");
  const [lastname, setLastname] = useState(props.user.lastname || "");
  const [contact, setContact] = useState(props.user.contact || "");
  const [email, setEmail] = useState(props.user.email || "");
  const [cnic, setCnic] = useState(props.user.cnic || "");
  const [password, setPassword] = useState(props.user.password || "");
  const [address, setAddress] = useState(props.user.address || "");
  // const [name,setName] = useState('');
  // const [name,setName] = useState('');

  useEffect(() => {
    setFirstname(props.user.firstname || "");
    setLastname(props.user.lastname || "");
    setCnic(props.user.cnic || "");
    setContact(props.user.contact || "");
    setEmail(props.user.email || "");
    setPassword(props.user.password || "");
    // setAddress(props.user.address || "");
    return;
  }, [props.user]);

  const update = async () => {
    let data = {
      firstname,
      lastname,
      contact,
      cnic,
      email,
      password,
      address,
      userId: id,
    };
    console.log("Profile: ", data);
    await props.updateUser(id, data);
    setFirstname(props.user.firstname || "");
    setLastname(props.user.lastname || "");
    setCnic(props.user.cnic || "");
    setContact(props.user.contact || "");
    setEmail(props.user.email || "");
    setPassword(props.user.password || "");
    // setAddress(props.user.address || "");
  };

  return (
    <>
      <Modal
        close={false}
        big={true}
        name={"profile"}
        title={{ name: "User Profile", symbol: "user" }}
      >
        <div>
          <input
            type="text"
            className="form-control"
            placeholder=" First Name "
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder=" Last Name "
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder=" CNIC "
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder=" Contact "
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder=" Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {/* <input
            type="text"
            className="form-control"
            placeholder=" Address "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br /> */}
          <input
            type="text"
            className="form-control"
            placeholder=" Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div>
            <button className="btn btn-primary" onClick={update}>
              {" "}
              Update{" "}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, data) => UpdateUsers(dispatch, id, data),
  login: (data) => UserLogin(dispatch, data),
  logout: () => UserLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { useState } from "react";
import { connect } from "react-redux";
import Panel from "../../../containers/Panel/Panel";
import PageCenter from "../../../containers/PageCenter/PageCenter";
import { UserLogin } from "./../../../actions/index";

const Login = (props) => {
  console.log("Login Panel");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const Empty = () => {
    setContact("");
    setPassword("");
  };

  const save = () => {
    let data = { contact, password, deviceId: 1 };
    props.login(data);

    Empty();
  };

  return (
    <>
      <PageCenter>
        <Panel head={<b>Login</b>}>
          <div className="input-form">
            <label> User Name </label>
            <input
              type="text"
              className="form-control"
              placeholder=" Enter Contact "
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <br />
          <div className="input-form">
            <label> Password </label>
            <input
              type="password"
              className="form-control"
              placeholder=" Enter Password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <br />
            <button className="btn btn-primary pull-right" onClick={save}>
              Log In
            </button>
            <div className="clearfix"></div>
          </div>
        </Panel>
        {/* <pre>{JSON.stringify(props.user, null, 2)}</pre> */}
      </PageCenter>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => UserLogin(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

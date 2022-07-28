import React, { useState } from "react";
import JWT from "jsonwebtoken";
import { KEY } from "./../../../configs/configs";
import Spinner from "../../Spinner/Spinner";
import SignIn from "../SignIn/Signin";
import { login, JwtDecode } from "./../../../requests/Login/Login";

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getLoginSymbol = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return <SignIn />;
    }
  };

  const submitForm = async () => {
    await setLoading(true);
    login(username, password, "web", async (data) => {
      if (data != null) {
        JwtDecode(data, async (decode) => {
          await localStorage.setItem("user", JSON.stringify(decode.user));
          await props.setUser(decode.user);
          await setLoading(false);
          props.setAuth(true);
          window.open("/dashboard", "_self");
        });
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder=" Enter Username "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder=" Enter Password "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btn-primary pull-right" onClick={submitForm}>
          {getLoginSymbol()}
          <span>Login</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;

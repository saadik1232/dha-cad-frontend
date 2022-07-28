import React, { useState } from "react";
import { connect } from "react-redux";
import * as Actions from "../../store/actions/userActions";
import { Switch, Redirect, Route } from "react-router-dom";
import Login from "../../components/Login/Login";
import jwt from "jsonwebtoken";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Dashboard from "../../components/Dasbhoard/Dashboard";

const MainPage = props => {
  const [red, setRed] = useState(false);
  const logout = () => {
    localStorage.removeItem("jwtToken");
    // ToastsStore.error("Logged Out !");
  };
  const verify = () => {
    var token = localStorage.getItem("jwtToken");
    if (token != null && token != "" && typeof token != "undefined") {
      return jwt.verify(token, "123456", (err, decoded) => {
        if (err) {
          return false;
        } else {
          console.log(decoded);
          return decoded;
        }
      });
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <div id="mainPage">
        {red ? <Redirect to="/" /> : null}
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/login" exact>
            {!verify() != false ? <Login /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/">
            {verify() != false ? null : <Redirect to="/login" />}
            <Dashboard verify={verify} logout={logout} setRed={setRed} />
          </Route>
        </Switch>
      </div>
      <ToastsContainer store={ToastsStore} />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loginUser: state.Users.loginUser,
    token: state.Users.decodedToken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTokenDecode: token => dispatch(Actions.tokenDecode(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

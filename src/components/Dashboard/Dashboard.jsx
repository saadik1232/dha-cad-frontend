import React, { useEffect, useState } from "react";
import { ToastsStore } from "react-toasts";
import Supervisor from "./Supervisor/Supervisor";
import { Redirect } from "react-router-dom";
import TopNavbar from "../TopNavbar/TopNavbar";
import MainScreen from "./Mainscreen2/Mainscreen";
import Operator from "./Operator2/Operator";
import Admin from "./Admin2/Admin";
import SuperAdmin from "./SuperAdmin2/SuperAdmin";

const Dashboard = (props) => {
  console.log(props.user);
  const roleSwitcher = () => {
    var role = "";
    if (props.user != null) {
      role = props.user.role.name || "";
      if (role == "supervisor") {
        return (
          <Supervisor {...props} user={props.user} setUser={props.setUser} />
        );
      } else if (role == "operator") {
        return (
          <Operator {...props} user={props.user} setUser={props.setUser} />
        );
      } else if (role == "main-screen") {
        return (
          <MainScreen {...props} user={props.user} setUser={props.setUser} />
        );
      } else if (role == "super-admin") {
        return (
          <SuperAdmin {...props} user={props.user} setUser={props.setUser} />
        );
      } else if (role == "admin") {
        return <Admin {...props} user={props.user} setUser={props.setUser} />;
      } else {
        ToastsStore.warning("Role did not Match Our Users. Thank you ! ");
        props.setAuth(false);
        return <Redirect to="/" />;
      }
    } else {
      ToastsStore.error("No User Found In the Local Storage !");
      return <Redirect to="/" />;
    }
  };

  return <React.Fragment>{roleSwitcher()}</React.Fragment>;
};

export default Dashboard;

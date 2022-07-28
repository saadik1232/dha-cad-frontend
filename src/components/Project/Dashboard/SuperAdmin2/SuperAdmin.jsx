import React, { useEffect, useState, Profiler } from "react";
import { connect } from "react-redux";
import TopBar from "./TopBar/TopBar";
import { UserLogout } from "../../../../actions/index";
import Users from "./Users/Users";
import Wall from "./Wall/Wall";
import Supervisor from "./Supervisor/Supervisor";
import Operator from "./Operator/Operator";
import Geofence from "./Geofence/Geofence";
import Services from "./Services/Services";
import Natures from "./Natures/Natures";
import Priorities from "./Priorities/Priorities";
import Subscriptions from "./Subscriptions/Subscriptions";
import Groups from "./Groups/Groups";
import Responders from "./Responders/Responders";
import Panics from "./Panics/Panics";
import Logs from "./Logs/Logs";
import Applications from "./Applications/Applications";
import Customers from "./Customers/Customers";
import Geo from "./Geo/Geo";
import GeoView from "./GeoView/GeoView";
import Profile from "./Profile/Profile";
import ResponderView from "./ResponderView/ResponderView";
import Admins from "./Users/Users";

const SuperAdmin = (props) => {
  console.log("Supervisor Dashboard Panel");

  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);

  const init = async () => {
    let right2 = await localStorage.getItem("rightPin");
    let left2 = await localStorage.getItem("leftPin");
    await setRight(right2 == "false" ? false : true);
    await setLeft(left2 == "false" ? false : true);
    // console.error(right2 === true, left2 === true);
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  const getBody = () => {
    if (left == true && right == true) {
      return (
        <div className="">
          <div className="row">
            <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3 tall theme"
              style={{ margin: 0, padding: 0 }}
            >
              <Panics />
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tall"
              style={{ margin: 0, padding: 0 }}
            >
              <Wall />
            </div>
            <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3 tall theme"
              style={{ margin: 0, padding: 0 }}
            >
              <Responders />
            </div>
          </div>
        </div>
      );
    } else if (left == false && right == true) {
      return (
        <div className="">
          <div className="row">
            {/* <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
              style={{ margin: 0, padding: 0 }}
            >
              <div style={{ background: "#000" }}>
                <br />
              </div>
            </div> */}
            <div
              className="col-lg-7 col-md-7 col-sm-7 col-xs-7 tall"
              style={{ margin: 0, padding: 0 }}
            >
              <Wall />
            </div>
            <div
              className="col-lg-5 col-md-5 col-sm-5 col-xs-5 tall theme"
              style={{ margin: 0, padding: 0 }}
            >
              <Responders />
            </div>
          </div>
        </div>
      );
    } else if (left == true && right == false) {
      return (
        <div className="">
          <div className="row">
            <div
              className="col-lg-5 col-md-5 col-sm-5 col-xs-5 tall theme"
              style={{ margin: 0, padding: 0 }}
            >
              <Panics />
            </div>
            <div
              className="col-lg-7 col-md-7 col-sm-7 col-xs-7 tall"
              style={{ margin: 0, padding: 0 }}
            >
              <Wall />
            </div>
            {/* <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
              style={{ margin: 0, padding: 0 }}
            >
              <div style={{ background: "#000" }}>
                <br />
              </div>
            </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="row">
            {/* <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
              style={{ margin: 0, padding: 0 }}
            >
              <div style={{ background: "#000" }}>
                <br />
              </div>
            </div> */}
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tall"
              style={{ margin: 0, padding: 0 }}
            >
              <Wall />
            </div>
            {/* <div
              className="col-lg-3 col-md-3 col-sm-3 col-xs-3"
              style={{ margin: 0, padding: 0 }}
            >
              <div style={{ background: "#000" }}>
                <br />
              </div>
            </div> */}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <TopBar setRight={setRight} setLeft={setLeft} />
      <div className="clearfix"></div>
      <Groups />
      <Supervisor />
      <Operator />
      {/* <Geofence /> */}
      {/* <Services /> */}
      <Natures />
      <Priorities />
      {/* <Subscriptions /> */}
      {/* <Logs /> */}
      {/* <Applications /> */}
      {/* <Customers /> */}
      {/* <Geo /> */}
      {/* <GeoView /> */}
      <Profile />
      {/* <ResponderView /> */}
      <Admins />

      {getBody()}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);

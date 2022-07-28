import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import TopNavbar from "./TopNavbar/TopNavbar";
import Welcome from "./Welcome/Welcome";
import Map from "./Map/Map";
import Modal from "../../../containers/Modal/Modal";
import ServicesCrud from "./ServicesCrud/ServicesCrud";
import {
  getAllLocations,
  getBuzyLocations,
  getFreeLocations,
} from "../../../requests/Responders/Responders";
// import { getAllPanics } from "../../../requests/Panic/Panic";
import { Beep1 } from "../../../Beeper/Beeper";
import LatLngCollect from "../../../Helpers/LatLngCollect";
import { getCenter } from "geolib";
import CityCrud from "./CityCrud/CityCrud";
import TownCrud from "./TownCrud/TownCrud";
import SubscriptionCrud from "./SubscriptionCrud/SubscriptionCrud";
// import Appliers from "./Appliers/Appliers";
import Profile from "./Profile/Profile";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import Panel from "../../../containers/Panel/Panel";

const MainScreen = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const localRefresh = async () => {
    console.error("Local");
    await setUser(JSON.parse(localStorage.getItem("user")));
  };

  const getMaps = () => {
    return (
      <Map
        lat={31.4676}
        lng={74.3209}
        // free={getFreeLocations}
        // buzy={getBuzyLocations}
        // panic={getAllPanics}
      />
    );
  };

  const getConfirmedPanel = () => {
    return (
      <React.Fragment>
        <div style={{ position: "absolute", top: 100, left: 100, zIndex: 10 }}>
          <Panel
            head={
              <div>
                <span className="pull-left">
                  <i className="fa fa-tags"></i>&nbsp; Confirmed Panic ALerts
                </span>
                <span className="pull-right" style={{ marginLeft: "20px" }}>
                  <i className="fa fa-remove"></i>
                </span>
                <div className="clearfix"></div>
              </div>
            }
          >
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nature</th>
                  <th>Priority</th>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </Panel>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Route path="/dashboard" exact>
        <TopNavbar
          title="Main Screen Panel"
          {...props}
          user={props.user}
          setUser={props.setUser}
        />
        {/* {getConfirmedPanel()} */}
        {getMaps()}
        {/* <Modal
          name="services"
          close={false}
          title={{
            name: "Services",
            symbol: "tags",
          }}
        >
          <ServicesCrud {...props} />
        </Modal> */}
        {/* <Modal
          name="city"
          close={false}
          title={{
            name: "City",
            symbol: "tags",
          }}
        >
          <CityCrud {...props} />
        </Modal> */}
        {/* <Modal
          name="town"
          close={false}
          title={{
            name: "Towns",
            symbol: "tags",
          }}
        >
          <TownCrud {...props} />
        </Modal> */}
        {/* <Modal
          big={true}
          name="subscription"
          close={false}
          title={{
            name: "Subscriptions",
            symbol: "tags",
          }}
        >
          <SubscriptionCrud {...props} />
        </Modal> */}
        {/* <Modal
          big={true}
          name="serviceApplied"
          close={false}
          title={{
            name: "Service Appliers",
            symbol: "file-o",
          }}
        >
          <Appliers />
        </Modal> */}
        <Modal
          big={true}
          name="profile"
          close={false}
          title={{
            name: "Profile",
            symbol: "user",
          }}
        >
          <Profile user={user} />
        </Modal>
        <Modal
          // big={true}
          name="profileEdit"
          close={false}
          back="profile"
          title={{
            name: "Edit Profile",
            symbol: "pencil",
          }}
        >
          <ProfileEdit user={user} localRefresh={localRefresh} />
        </Modal>
      </Route>
    </React.Fragment>
  );
};

export default MainScreen;

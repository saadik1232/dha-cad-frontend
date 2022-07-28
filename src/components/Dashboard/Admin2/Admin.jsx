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
import { getAllPanics } from "../../../requests/Panic/Panic";
import { Beep1 } from "../../../Beeper/Beeper";
import LatLngCollect from "../../../Helpers/LatLngCollect";
import { getCenter } from "geolib";
import CityCrud from "./CityCrud/CityCrud";
import TownCrud from "./TownCrud/TownCrud";
import SubscriptionCrud from "./SubscriptionCrud/SubscriptionCrud";
import Appliers from "./Appliers/Appliers";
import Profile from "./Profile/Profile";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import Panel from "../../../containers/Panel/Panel";
import Geofence from "./Geofence/Geofence";
import AddResponder from "./AddResponders/AddResponders";
import Window from "./Window/Window";

const Admin = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [zoom, setZoom] = useState(11);
  const [utype, setUtype] = useState("offline");
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
        panic={getAllPanics}
        zoom={zoom}
        userType={utype}
        getPanel={getConfirmedPanel}
      />
    );
  };

  const getConfirmedPanel = (heading, heads, data) => {
    return (
      <React.Fragment>
        <Window heading={heading} heads={[]} data={[]} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Route path="/dashboard" exact>
        <TopNavbar
          title="Supervisor Panel"
          {...props}
          user={props.user}
          setUser={props.setUser}
          utype={utype}
          setUtype={setUtype}
        />
        <Window />
        {getMaps()}
        <Modal
          name="services"
          close={false}
          title={{
            name: "Services",
            symbol: "tags",
          }}
        >
          <ServicesCrud {...props} />
        </Modal>
        <Modal
          name="city"
          close={false}
          title={{
            name: "City",
            symbol: "tags",
          }}
        >
          <CityCrud {...props} />
        </Modal>
        <Modal
          name="town"
          close={false}
          title={{
            name: "Towns",
            symbol: "tags",
          }}
        >
          <TownCrud {...props} />
        </Modal>
        <Modal
          big={true}
          name="subscription"
          close={false}
          title={{
            name: "Subscriptions",
            symbol: "tags",
          }}
        >
          <SubscriptionCrud {...props} />
        </Modal>
        <Modal
          big={true}
          name="serviceApplied"
          close={false}
          title={{
            name: "Customer Service Request",
            symbol: "file-o",
          }}
        >
          <Appliers />
        </Modal>
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
        <Modal
          big={true}
          name="geofence"
          close={false}
          title={{
            name: "Geofence",
            symbol: "globe",
          }}
        >
          <Geofence user={user} localRefresh={localRefresh} />
        </Modal>
        <Modal
          big={true}
          name="addResponders"
          close={false}
          title={{
            name: "Add Responders",
            symbol: "truck",
          }}
        >
          <AddResponder user={user} localRefresh={localRefresh} />
        </Modal>
      </Route>
    </React.Fragment>
  );
};

export default Admin;

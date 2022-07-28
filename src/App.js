import React from "react";
import Test from "./components/Test/Test";
import { Switch, Route } from "react-router-dom";
import Modal from "./containers/Modal/Modal";
import Project from "./components/Project/Project";
import { ToastsStore, ToastsContainer } from "react-toasts";
import WebRtc from "./components/WebRtc/WebRtc";
import GetPrivateNotification from "./components/Project/Dashboard/Supervisor/Notifications/private notifications/GetAllNotifications";
import AddPrivateNotification from "./components/Project/Dashboard/Supervisor/Notifications/private notifications/AddPrivateNotification";
import GetPublicNotification from "./components/Project/Dashboard/Supervisor/Notifications/Public Notification/GetPublicNotification";
import AddNotification from "./components/Project/Dashboard/Supervisor/Notifications/Public Notification/AddNotifiaction";
import GetUserNotification from "./components/Project/Dashboard/Supervisor/Notifications/UserNotification/GetUserNotification";
//import GetNOtification from "./components/Project/Dashboard/Supervisor/Notifications/private notifications/GetAllNotifications";

function App(props) {
  console.log("App Component");
  return (
    <>
      <Switch>
        <Route path="/webrtc" exact>
          <WebRtc />
        </Route>
        <Route path="/test" exact>
          <div
            className="container"
            style={{ height: "800px", overflow: "auto" }}
          >
            <br />
            <Test />
          </div>
        </Route>
        <Route path="/" exact>
          <Project />
        </Route>
        <Route path="/privatenotification" exact>
          <GetPrivateNotification />
        </Route>
        <Route path="/addprivatenotification" exact>
          <AddPrivateNotification />
        </Route>
        <Route path="/addpublicnotifications" exact>
          <AddNotification />
        </Route>
        <Route path="/publicnotification" exact>
          <GetPublicNotification />
        </Route>
        <Route path="/usernotification" exact>
          <GetUserNotification />
        </Route>
      </Switch>
      <ToastsContainer store={ToastsStore} />
    </>
  );
}

export default App;

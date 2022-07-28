import React, { useEffect } from "react";
import { connect } from "react-redux";
import SuperAdmin from "./SuperAdmin2/SuperAdmin";
import Admin from "./Admin/Admin";
import {
  FetchAllGeofences,
  GetTraccarGroups,
  GetUsers,
  GetServices,
  GetNatures,
  GetPriorities,
  GetSubscriptions,
  GetAllResponder,
  GetPanics,
  GetNotificationLogs,
  GetChatLogs,
} from "./../../../actions/index";
import Supervisor from "./Supervisor/Supervisor";
import Supervisor2 from "./Supervisor2/Supervisor";
import Operator2 from "./Operator2/Operator";
import Mainscreen from "./Mainscreen/Mainscreen";

const Dashboard = (props) => {
  console.log("Dashboard");

  const init = async () => {
    await props.getGeofences();
    await props.getTraccarGroups();
    await props.getUsers();
    await props.getServices();
    await props.getNatures();
    await props.getPriorities();
    await props.getSubscriptions();
    await props.getResponders();
    await props.getPanics();
    await props.getNotificationLogs();
    await props.getChatLogs();
  };

  useEffect(() => {
    init();
    return;
  }, []);

  const selectUser = () => {
    if (props.user.roleId == 10) {
      return <SuperAdmin />;
    } else if (props.user.roleId == 2) {
      if (props.user.firstname == "supr_1") {
        return <Supervisor />;
      }
      if (props.user.firstname == "supr_2") {
        return <Supervisor2 />;
      }
    } else if (props.user.roleId == 3) {
      return <Operator2 />;
    } else if (props.user.roleId == 7) {
      return <Mainscreen />;
    } else if (props.user.roleId == 1) {
      return <Admin />;
    } else {
      return <pre>{JSON.stringify(props.user, null, 2)}</pre>;
    }
  };

  return <>{selectUser()}</>;
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({
  getGeofences: () => FetchAllGeofences(dispatch),
  getTraccarGroups: () => GetTraccarGroups(dispatch),
  getUsers: () => GetUsers(dispatch),
  getServices: () => GetServices(dispatch),
  getNatures: () => GetNatures(dispatch),
  getPriorities: () => GetPriorities(dispatch),
  getSubscriptions: () => GetSubscriptions(dispatch),
  getResponders: () => GetAllResponder(dispatch),
  getPanics: () => GetPanics(dispatch),
  getNotificationLogs: () => GetNotificationLogs(dispatch),
  getChatLogs: () => GetChatLogs(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

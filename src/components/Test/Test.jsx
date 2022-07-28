import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  GetCities,
  GetTowns,
  GetNatures,
  GetPanics,
  GetPriorities,
  GetStatuses,
  GetUsers,
  GetRoles,
  GetSubscriptions,
  GetThirdParty,
  GetServices,
  GetAllResponder,
  GetGeofences,
  GetTraccarGroups,
  FetchAllGeofences,
  GetNotificationLogs,
} from "./../../actions/index";

const Test = (props) => {
  let renders = useRef(1);
  console.log("Test Component: ", renders.current);
  renders.current++;

  const loadData = async () => {
    props.getCities();
    props.getTowns();
    props.getRoles();
    props.getServices();
    props.getSubscriptions();
    props.getUsers();
    props.getPriorities();
    props.getNatures();
    props.getStatuses();
    props.getThirdParty();
    props.getAllResponder();
    props.getPanics();
    props.getGeofences();
    props.getTraccarGroups();
    props.fetchAllGeofences();
    props.getNotificationLogs();
  };

  useEffect(() => {
    loadData();
    return;
  }, []);

  return (
    <>
      <h1> Testing Data ... </h1>
      <pre>
        <b> Notification Logs: </b>{" "}
        {JSON.stringify(props.notificationLogs, null, 2)}
      </pre>
      <pre>
        <b> Traccar Geofences: </b>{" "}
        {JSON.stringify(props.traccarGeofences, null, 2)}
      </pre>
      <pre>
        <b> Groups: </b> {JSON.stringify(props.groups, null, 2)}
      </pre>
      <pre>
        <b> Geofences: </b> {JSON.stringify(props.geofences, null, 2)}
      </pre>
      <pre>
        <b> Online Responders: </b>{" "}
        {JSON.stringify(props.onlineResponders, null, 2)}
      </pre>
      <pre>
        <b> Unknown Responders: </b>{" "}
        {JSON.stringify(props.unknownResponders, null, 2)}
      </pre>
      <pre>
        <b> Offline Responders: </b>{" "}
        {JSON.stringify(props.offlineResponders, null, 2)}
      </pre>
      <pre>
        <b> Buzy Responders: </b>{" "}
        {JSON.stringify(props.buzyResponders, null, 2)}
      </pre>
      <pre>
        <b> Free Responders: </b>{" "}
        {JSON.stringify(props.freeResponders, null, 2)}
      </pre>
      <pre>
        <b> GSM: </b> {JSON.stringify(props.gsm, null, 2)}
      </pre>
      <pre>
        <b> Main Screen: </b> {JSON.stringify(props.mainScreen, null, 2)}
      </pre>
      <pre>
        <b> Operator: </b> {JSON.stringify(props.operators, null, 2)}
      </pre>
      <pre>
        <b> Supervisor: </b> {JSON.stringify(props.supervisors, null, 2)}
      </pre>
      <pre>
        <b> Admin: </b> {JSON.stringify(props.admin, null, 2)}
      </pre>
      <pre>
        <b> Super Admin: </b> {JSON.stringify(props.superAdmin, null, 2)}
      </pre>
      <pre>
        <b> Responders: </b> {JSON.stringify(props.responders, null, 2)}
      </pre>
      <pre>
        <b> Customers: </b> {JSON.stringify(props.customers, null, 2)}
      </pre>
      <pre>
        <b> Third Party: </b> {JSON.stringify(props.thirdParty, null, 2)}
      </pre>
      <pre>
        <b> Services: </b> {JSON.stringify(props.services, null, 2)}
      </pre>
      <pre>
        <b> Panics: </b> {JSON.stringify(props.panics, null, 2)}
      </pre>
      <pre>
        <b> Subscriptions: </b> {JSON.stringify(props.subscriptions, null, 2)}
      </pre>
      <pre>
        <b> Statuses: </b> {JSON.stringify(props.statuses, null, 2)}
      </pre>
      <pre>
        <b> Natures: </b> {JSON.stringify(props.natures, null, 2)}
      </pre>
      <pre>
        <b> Priorities: </b> {JSON.stringify(props.priorities, null, 2)}
      </pre>
      <pre>
        <b> Users: </b> {JSON.stringify(props.users, null, 2)}
      </pre>
      <pre>
        <b> Roles: </b> {JSON.stringify(props.roles, null, 2)}
      </pre>
      <pre>
        <b> Towns: </b> {JSON.stringify(props.towns, null, 2)}
      </pre>
      <pre>
        <b> Cities: </b> {JSON.stringify(props.cities, null, 2)}
      </pre>
    </>
  );
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  towns: state.towns,
  roles: state.roles,
  users: state.users,
  priorities: state.priorities,
  natures: state.natures,
  statuses: state.statuses,
  subscriptions: state.subscriptions,
  panics: state.panics,
  services: state.services,
  thirdParty: state.thirdParty,
  customers: state.customers,
  responders: state.responders,
  operators: state.operators,
  supervisors: state.supervisors,
  mainScreen: state.mainScreen,
  gsm: state.gsm,
  admin: state.admin,
  superAdmin: state.superAdmin,
  freeResponders: state.freeResponders,
  buzyResponders: state.buzyResponders,
  onlineResponders: state.onlineResponders,
  offlineResponders: state.offlineResponders,
  unknownResponders: state.unknownResponders,
  geofences: state.geofences,
  groups: state.groups,
  traccarGeofences: state.traccarGeofences,
  notificationLogs: state.notificationLogs,
});

const mapDispatchToProps = (dispatch) => ({
  getCities: () => GetCities(dispatch),
  getTowns: () => GetTowns(dispatch),
  getRoles: () => GetRoles(dispatch),
  getUsers: () => GetUsers(dispatch),
  getPriorities: () => GetPriorities(dispatch),
  getNatures: () => GetNatures(dispatch),
  getStatuses: () => GetStatuses(dispatch),
  getSubscriptions: () => GetSubscriptions(dispatch),
  getPanics: () => GetPanics(dispatch),
  getServices: () => GetServices(dispatch),
  getThirdParty: () => GetThirdParty(dispatch),
  getAllResponder: () => GetAllResponder(dispatch),
  getGeofences: () => GetGeofences(dispatch),
  getTraccarGroups: () => GetTraccarGroups(dispatch),
  fetchAllGeofences: () => FetchAllGeofences(dispatch),
  getNotificationLogs: () => GetNotificationLogs(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);

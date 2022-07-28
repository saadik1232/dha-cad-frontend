import { Actions } from "./../configs/index";
import { isPointInPolygon } from "geolib";

const initialState = {
  cities: [],
  towns: [],
  roles: [],
  users: [],
  priorities: [],
  natures: [],
  statuses: [],
  subscriptions: [],
  panics: [],
  services: [],
  thirdParty: [],
  customers: [],
  responders: [],
  operators: [],
  supervisors: [],
  superAdmin: [],
  admin: [],
  customerFamily: [],
  mainScreen: [],
  gsm: [],
  freeResponders: [],
  buzyResponders: [],
  onlineResponders: [],
  offlineResponders: [],
  unknownResponders: [],
  outBoundResponders: [],
  distanceSortedResponders: [],
  geofences: [],
  traccarGeofences: [],
  inQueryPanics: [],
  confirmedByOperatorPanics: [],
  assignedToResponderPanics: [],
  confirmedByResponderPanics: [],
  resolvedByResponderPanics: [],
  resolvedByOperatorPanics: [],
  closedBySupervisorPanics: [],
  closedByCustomerPanics: [],
  cancelledPanics: [],
  closedPanics: [],
  resolvedPanics: [],
  logger: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  groups: [],
  traccarUsers: [],
  zoomLevel: 10, // Number(localStorage.getItem("zoom")) || 10,
  latitude: 31,
  longitude: 74,
  geoLng: 74.42696711164534,
  geoLat: 31.521113782075002,
  eventLogs: [],
  notificationLogs: [],
  chatLogs: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CITIES:
      return { ...state, cities: action.payload };
    case Actions.GET_TOWNS:
      return { ...state, towns: action.payload };
    case Actions.GET_ROLES:
      return { ...state, roles: action.payload };
    case Actions.GET_USERS:
      return {
        ...state,
        users: action.payload.all,
        customers: action.payload.customers,
        responders: action.payload.responders,
        operators: action.payload.operators,
        supervisors: action.payload.supervisors,
        mainScreen: action.payload.mainScreen,
        gsm: action.payload.gsm,
        admin: action.payload.admin,
        superAdmin: action.payload.superAdmin,
      };
    case Actions.GET_PRIORITIES:
      return { ...state, priorities: action.payload };
    case Actions.GET_NATURES:
      return { ...state, natures: action.payload };
    case Actions.GET_STATUSES:
      return { ...state, statuses: action.payload };
    case Actions.GET_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.payload };
    case Actions.GET_PANICS:
      return {
        ...state,
        panics: [...action.payload.data],
        inQueryPanics: [...action.payload.inQuery],
        confirmedByOperatorPanics: [...action.payload.ConfirmedByOperator],
        assignedToResponderPanics: [...action.payload.AssignedToResponder],
        confirmedByResponderPanics: [...action.payload.ConfirmedByResponder],
        resolvedByResponderPanics: [...action.payload.ResolvedByResponder],
        resolvedByOperatorPanics: [...action.payload.ResolvedByOperator],
        closedBySupervisorPanics: [...action.payload.ClosedBySupervisor],
        closedByCustomerPanics: [...action.payload.ClosedByCustomer],
        cancelledPanics: [...action.payload.cancelled],
        closedPanics: [...action.payload.closed],
      };
    case Actions.GET_SERVICES:
      return { ...state, services: action.payload };
    case Actions.GET_THIRD_PARTY:
      return { ...state, thirdParty: action.payload };
    case Actions.GET_ALL_RESPONDERS:
      let G = [...state.traccarGeofences];
      let geo = G.map((item) => {
        return item.geometry.coordinates[0];
      });
      let outBound = [];
      for (let i = 0; i < geo.length; i++) {
        let ele = geo[i];
        for (let j = 0; j < action.payload.online.length; j++) {
          let ele2 = action.payload.online[j];
          let result = isPointInPolygon(
            { latitude: ele2.lat, longitude: ele2.lng },
            ele
          );
          if (!result) {
            outBound.push(ele2);
          }
        }
      }
      let outBound2 = outBound.filter((item) => {
        let flag = 0;
        for (let i = 0; i < outBound.length; i++) {
          let ele = outBound[i];
          if (ele.id == item.id) {
            flag = flag + 1;
          }
        }
        if (flag > 1) {
          return true;
        } else {
          return false;
        }
      });
      // let data3 = [
      //   ...action.payload.offline,
      //   ...action.payload.unknown,
      //   ...action.payload.online,
      // ];
      // data3.filter((item) => {
      //   if (item.db != null) {
      //     for (let i = 0; i < state.groups.length; i++) {
      //       let ele = state.groups[i];
      //     }
      //   } else {
      //     return false;
      //   }
      // });
      return {
        ...state,
        offlineResponders: action.payload.offline,
        unknownResponders: action.payload.unknown,
        onlineResponders: action.payload.online,
        buzyResponders: action.payload.buzy,
        freeResponders: action.payload.free,
        outBoundResponders: outBound2,
      };
    case Actions.GET_GEOFENCES:
      return { ...state, geofences: action.payload };
    case Actions.USER_AUTH_LOGIN:
      return { ...state, logger: action.payload };
    case Actions.GET_TRACCAR_GROUPS:
      return { ...state, groups: action.payload };
    case Actions.USER_LOGOUT:
      return {
        ...state,
        logger: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null,
      };
    case Actions.CREATE_TRACCAR_GROUPS:
      return state;
    case Actions.EDIT_TRACCAR_GROUPS:
      return state;
    case Actions.DEL_TRACCAR_GROUPS:
      return state;
    case Actions.CREATE_ADMIN:
      return state;
    case Actions.EDIT_USERS:
      // console.log(action.payload);
      if (action.payload) {
        return { ...state, logger: action.payload };
      } else {
        return state;
      }
    case Actions.DEL_USERS:
      return state;
    case Actions.CREATE_NATURES:
      return state;
    case Actions.EDIT_NATURES:
      return state;
    case Actions.DEL_NATURES:
      return state;
    case Actions.CREATE_PRIORITIES:
      return state;
    case Actions.EDIT_PRIORITIES:
      return state;
    case Actions.DEL_PRIORITIES:
      return state;
    case Actions.CREATE_STATUSES:
      return state;
    case Actions.EDIT_STATUSES:
      return state;
    case Actions.DEL_STATUSES:
      return state;
    case Actions.CREATE_PANICS:
      return state;
    case Actions.EDIT_PANICS:
      return state;
    case Actions.DEL_PANICS:
      return state;
    case Actions.CREATE_SERVICES:
      return state;
    case Actions.EDIT_SERVICES:
      return state;
    case Actions.DEL_SERVICES:
      return state;
    case Actions.CREATE_SUBSCRIPTIONS:
      return state;
    case Actions.EDIT_SUBSCRIPTIONS:
      return state;
    case Actions.DEL_SUBSCRIPTIONS:
      return state;
    case Actions.GET_TRACCAR_GEOFENCES:
      return { ...state, traccarGeofences: action.payload };
    case Actions.CHANGE_ZOOM_LEVEL:
      return { ...state, zoomLevel: action.payload };
    case Actions.GET_CENTER:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    case Actions.CHANGE_GEO_LAT_LNG:
      return {
        ...state,
        geoLat: action.payload.lat,
        geoLng: action.payload.lng,
      };
    case Actions.UPDATE_TRACCAR_GEOGENCES:
      return state;
    case Actions.DEL_TRACCAR_GEOFENCES:
      return state;
    case Actions.GET_GEO_DISTANCES:
      return { ...state, distanceSortedResponders: action.payload };
    case Actions.CREATE_RESPONDERS:
      return state;
    case Actions.GET_EVENT_LOGS:
      return { ...state, eventLogs: action.payload };
    case Actions.GET_CHAT_LOGS:
      return { ...state, chatLogs: action.payload };
    case Actions.GET_NOTIFICATION_LOGS:
      return { ...state, notificationLogs: action.payload };
    default:
      return state;
  }
};

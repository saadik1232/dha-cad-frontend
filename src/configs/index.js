import { encode } from "base-64";
//this is where you can put ip and port of back-end for api calls
//const IP = "182.184.65.213";
// const IP = "192.168.137.1";
const IP = "192.168.1.13";
//const IP = "192.168.100.131";
const PORT = 3001;
const PROTOCOL = "http";

export const URL = PROTOCOL + "://" + IP + ":" + PORT + "/";

export const TRACCAR = "https://trac.dextrologix.com/api/";
// export const TRACCAR = "http://192.168.50.41:8082/api/";

const ACCOUNT = {
  USER: "admin",
  PASSWORD: "L@s3rjet9045",
};

export const TRAC_ACCOUNT_ENCODED = encode(
  ACCOUNT.USER + ":" + ACCOUNT.PASSWORD
);
export const TRAC_ACCOUNT = ACCOUNT;

export const JWT = {
  KEY: "123456",
  MIN: 10,
};

export const Actions = {
  GET_CITIES: "GET_CITIES",
  GET_TOWNS: "GET_TOWNS",
  GET_ROLES: "GET_ROLES",
  GET_USERS: "GET_USERS",
  CREATE_ADMIN: "CREATE_ADMIN",
  CREATE_SUPERVISOR: "CREATE_SUPERVISOR",
  CREATE_OPERATOR: "CREATE_OPERATOR",
  EDIT_USERS: "EDIT_USERS",
  DEL_USERS: "DEL_USERS",
  GET_PRIORITIES: "GET_PRIORITIES",
  CREATE_PRIORITIES: "CREATE_PRIORITIES",
  EDIT_PRIORITIES: "EDIT_PRIORITIES",
  DEL_PRIORITIES: "DEL_PRIORITIES",
  GET_NATURES: "GET_NATURES",
  CREATE_NATURES: "CREATE_NATURES",
  EDIT_NATURES: "EDIT_NATURES",
  DEL_NATURES: "DEL_NATURES",
  GET_STATUSES: "GET_STATUSES",
  CREATE_STATUSES: "CREATE_STATUSES",
  EDIT_STATUSES: "EDIT_STATUSES",
  DEL_STATUSES: "DEL_STATUSES",
  GET_PANICS: "GET_PANICS",
  CREATE_PANICS: "CREATE_PANICS",
  EDIT_PANICS: "EDIT_PANICS",
  DEL_PANICS: "DEL_PANICS",
  GET_SUBSCRIPTIONS: "GET_SUBSCRIPTIONS",
  CREATE_SUBSCRIPTIONS: "CREATE_SUBSCRIPTIONS",
  EDIT_SUBSCRIPTIONS: "EDIT_SUBSCRIPTIONS",
  DEL_SUBSCRIPTIONS: "DEL_SUBSCRIPTIONS",
  GET_SERVICES: "GET_SERVICES",
  CREATE_SERVICES: "CREATE_SERVICES",
  EDIT_SERVICES: "EDIT_SERVICES",
  DEL_SERVICES: "DEL_SERVICES",
  GET_THIRD_PARTY: "GET_THIRD_PARTY",
  GET_ALL_RESPONDERS: "GET_ALL_RESPONDERS",
  GET_GEOFENCES: "GET_GEOFENCES",
  USER_AUTH_LOGIN: "USER_AUTH_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  GET_TRACCAR_USERS: "GET_TRACCAR_USERS",
  GET_TRACCAR_GROUPS: "GET_TRACCAR_GROUPS",
  CREATE_TRACCAR_GROUPS: "CREATE_TRACCAR_GROUPS",
  DEL_TRACCAR_GROUPS: "DEL_TRACCAR_GROUPS",
  EDIT_TRACCAR_GROUPS: "EDIT_TRACCAR_GROUPS",
  GET_TRACCAR_GEOFENCES: "GET_TRACCAR_GEOFENCES",
  DEL_TRACCAR_GEOFENCES: "GET_TRACCAR_GEOFENCES",
  // EDIT_TRACCAR_GEOFENCES: "EDIT_TRACCAR_GEOFENCES",
  CREATE_TRACCAR_GEOFENCES: "CREATE_TRACCAR_GEOFENCES",
  CHANGE_ZOOM_LEVEL: "CHANGE_ZOOM_LEVEL",
  GET_CENTER: "GET_CENTER",
  CHANGE_GEO_LAT_LNG: "CHANGE_GEO_LAT_LNG",
  UPDATE_TRACCAR_GEOGENCES: "UPDATE_TRACCAR_GEOGENCES",
  // DEL_TRACCAR_GEOGENCES: "DEL_TRACCAR_GEOGENCES",
  GET_GEO_DISTANCES: "GET_GEO_DISTANCES",
  CREATE_RESPONDERS: "CREATE_RESPONDERS",
  GET_EVENT_LOGS: "GET_EVENT_LOGS",
  GET_CHAT_LOGS: "GET_CHAT_LOGS",
  GET_NOTIFICATION_LOGS: "GET_NOTIFICATION_LOGS",
};

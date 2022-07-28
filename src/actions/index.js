import { Actions } from "./../configs/index";
import axios from "axios";
import {
  URL,
  JWT,
  TRACCAR,
  TRAC_ACCOUNT,
  TRAC_ACCOUNT_ENCODED,
} from "./../configs/index";
import Jwt from "jsonwebtoken";

export const GetCities = (dispatch) => {
  const url = URL + "city";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_CITIES,
          payload: data,
        });
      } else {
        console.log("GET Cities Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Cities Expections");
    });
};

export const GetTowns = (dispatch) => {
  const url = URL + "town";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_TOWNS,
          payload: data,
        });
      } else {
        console.log("GET Towns Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Towns Expections");
    });
};

export const GetRoles = (dispatch) => {
  const url = URL + "role";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_ROLES,
          payload: data,
        });
      } else {
        console.log("GET Roles Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Roles Expections");
    });
};

export const GetUsers = (dispatch) => {
  const url = URL + "user/all";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        //   All Users
        let customers = data.filter((user) => user.roleId == 5);
        let responders = data.filter((user) => user.roleId == 4);
        let operators = data.filter((user) => user.roleId == 3);
        let supervisors = data.filter((user) => user.roleId == 2);
        let mainScreen = data.filter((user) => user.roleId == 7);
        let gsm = data.filter((user) => user.roleId == 9);
        let admin = data.filter((user) => user.roleId == 1);
        let superAdmin = data.filter((user) => user.roleId == 10);
        dispatch({
          type: Actions.GET_USERS,
          payload: {
            all: data,
            customers,
            responders,
            operators,
            supervisors,
            mainScreen,
            gsm,
            admin,
            superAdmin,
          },
        });
      } else {
        console.log("GET Users Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Users Expections");
    });
};

export const CreateAdmin = (dispatch, props) => {
  console.log(props);
  const url = URL + "user/admin-register";
  axios
    .post(url, props)
    .then((response) => {
      console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_ADMIN,
        });
      } else {
        console.log("Create Users Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const CreateSupervisor = (dispatch, props) => {
  // console.log(props);
  const url = URL + "user/supervisor-register";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_SUPERVISOR,
        });
      } else {
        console.log("Create Supervisor Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const CreateOperator = (dispatch, props) => {
  // console.log(props);
  const url = URL + "user/operator-register";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_OPERATOR,
        });
      } else {
        console.log("Create Operator Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const UpdateUsers = (dispatch, id, props, auth = true) => {
  const url = URL + "user/update";
  props.userId = id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        // console.log("Props: ", { props, url, data, code });
        if (auth) {
          localStorage.setItem("user", JSON.stringify(data));
          dispatch({
            type: Actions.EDIT_USERS,
            payload: data,
          });
        } else {
          // console.error("Done");
          dispatch({
            type: Actions.EDIT_USERS,
          });
        }
      } else {
        console.log("Update Users Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const DelUsers = (dispatch, id) => {
  const url = URL + "user/del/" + id;
  // console.log(url, id);
  axios
    .post(url, { id })
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_USERS,
        });
      } else {
        console.log("Delete Users Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const GetPriorities = (dispatch) => {
  const url = URL + "priority";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_PRIORITIES,
          payload: data,
        });
      } else {
        console.log("GET Priorities Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Priorities Expections");
    });
};

export const GetNatures = (dispatch) => {
  const url = URL + "nature";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_NATURES,
          payload: data,
        });
      } else {
        console.log("GET Natures Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Natures Expections");
    });
};

export const GetStatuses = (dispatch) => {
  const url = URL + "status";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_STATUSES,
          payload: data,
        });
      } else {
        console.log("GET Status Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Status Expections");
    });
};

export const GetPanics = (dispatch) => {
  const url = URL + "panic";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      //console.log("response from get panic api call", data);
      let code = response.data.result.status;
      if (code == 200) {
        let cancelled = data.filter((item) => item.isCancelled == 1);
        let closed = data.filter(
          (item) => item.isClose == 1 || item.isResolved == 1
        );
        data = data.filter(
          (item) => item.isCancelled != 1 && item.isClose != 1
        );
        let inQuery = data.filter(
          (item) =>
            item.statusId == 1 && item.isCancelled != 1 && item.isClose != 1
          // &&
          // item.operatorInvolved != 0 &&
          // item.operatorInvolved != null &&
          // item.supervisorInvolved != 0 &&
          // item.supervisorInvolved != null
        );
        let ConfirmedByOperator = data.filter(
          (item) =>
            item.statusId == 2 && item.isCancelled != 1 && item.isClose != 1
        );
        let AssignedToResponder = data.filter(
          (item) =>
            item.statusId == 3 && item.isCancelled != 1 && item.isClose != 1
        );
        let ResolvedByResponder = data.filter(
          (item) =>
            item.statusId == 4 && item.isCancelled != 1 && item.isClose != 1
        );
        let ResolvedByOperator = data.filter(
          (item) =>
            item.statusId == 5 && item.isCancelled != 1 && item.isClose != 1
        );
        let ClosedBySupervisor = data.filter(
          (item) =>
            item.statusId == 6 && item.isCancelled != 1 && item.isClose != 1
        );
        let ConfirmedByResponder = data.filter(
          (item) =>
            item.statusId == 7 && item.isCancelled != 1 && item.isClose != 1
        );
        let ClosedByCustomer = data.filter(
          (item) =>
            item.statusId == 8 && item.isCancelled != 1 && item.isClose != 1
        );
        dispatch({
          type: Actions.GET_PANICS,
          payload: {
            data,
            inQuery,
            ConfirmedByOperator,
            AssignedToResponder,
            ConfirmedByResponder,
            ResolvedByResponder,
            ResolvedByOperator,
            ClosedBySupervisor,
            ClosedByCustomer,
            cancelled,
            closed,
          },
        });
      } else {
        console.log("GET Panics Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Panics Exceptions", e);
    });
};

export const GetSubscriptions = (dispatch) => {
  const url = URL + "subscription";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_SUBSCRIPTIONS,
          payload: data,
        });
      } else {
        console.log("GET Subscriptions Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Subscriptions Expections");
    });
};

export const GetServices = (dispatch) => {
  const url = URL + "service";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_SERVICES,
          payload: data,
        });
      } else {
        console.log("GET Services Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Services Expections");
    });
};

export const GetThirdParty = (dispatch) => {
  const url = URL + "third-party";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_THIRD_PARTY,
          payload: data,
        });
      } else {
        console.log("GET Third Party Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Third Party Expections");
    });
};

export const GetAllResponder = (dispatch) => {
  const url = URL + "responder/all";
  axios
    .post(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        // console.error("1: ", data);
        data = data.map((item) => {
          item.lat = item.position.latitude;
          item.lng = item.position.longitude;
          return item;
        });
        let offline = data.filter((responder) => {
          if (responder.status == "offline") {
            return true;
          } else if (
            responder.db != null &&
            responder.db.userActivation == false
          ) {
            return true;
          } else {
            return false;
          }
        });
        let unknown = data.filter((responder) => responder.status == "unknown");
        let online = data.filter((responder) => {
          if (
            responder.status == "online" &&
            responder.db != null &&
            responder.db.userActivation == true
          ) {
            return true;
          } else {
            return false;
          }
        });

        // Panic Start
        const url2 = URL + "panic";
        axios
          .get(url2)
          .then((response2) => {
            //   console.log(response.data);
            let data2 = response2.data.result.data;
            let code2 = response2.data.result.status;
            if (code2 == 200) {
              let activePanics = [];
              for (let i = 0; i < data2.length; i++) {
                let element = data2[i];
                if (
                  element.responderInvolved != 0 &&
                  element.responderInvolved != null
                ) {
                  if (
                    (element.isClose == false || element.isClose == null) &&
                    (element.statusId == 3 ||
                      element.statusId == 7 ||
                      element.statusId == 4)
                  ) {
                    activePanics.push(element.responderInvolved);
                    console.error("active");
                  }
                }
              }
              //   console.log(activePanics);
              let buzy = [];
              let free = [];
              if (activePanics.length > 0) {
                for (let i = 0; i < online.length; i++) {
                  let element = online[i];
                  if (element.db != null) {
                    if (activePanics.includes(element.db.id)) {
                      buzy.push(element);
                    } else {
                      free.push(element);
                      console.error("free");
                    }
                  } else {
                    free.push(element);
                    console.error("free");
                  }
                }
              }

              if (buzy.length < 1) {
                free = online;
              }

              dispatch({
                type: Actions.GET_ALL_RESPONDERS,
                payload: {
                  offline,
                  unknown,
                  online,
                  buzy,
                  free,
                },
              });
            } else {
              console.log("GET Panics Invalid Response");
            }
          })
          .catch((e) => {
            console.error("Get Panics Exceptions", e);
          });
        // Panic End
      } else {
        console.log("GET All Responders Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get All Responders Expections");
    });
};

const polygonStringToCoords = (data) => {
  var part1 = data.split("POLYGON((");
  var part2 = part1[1].split("))");
  var part3 = part2[0];
  var part4 = part3.split(", ");
  var part5 = [];
  for (let index = 0; index < part4.length; index++) {
    const element = part4[index];
    var part6 = element.split(" ");
    part5.push([Number(part6[0]), Number(part6[1])]);
  }
  return part5;
};

export const GetGeofences = (dispatch) => {
  //   console.log(TRAC_ACCOUNT_ENCODED);
  const url = URL + "geofence";
  axios
    .get(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        const url2 = TRACCAR + "geofences";
        const headers2 = {
          headers: {
            Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
          },
        };
        axios
          .get(url2, headers2)
          .then((response2) => {
            if (response2.data) {
              let data2 = response2.data;
              //   console.log(data2);
              let info = [];
              for (let i = 0; i < data.length; i++) {
                let element = data[i];
                for (let j = 0; j < data2.length; j++) {
                  let element2 = data2[j];
                  if (element2.id == element.geofenceId) {
                    element.traccar = element2;
                    element.traccar.coords = polygonStringToCoords(
                      element.traccar.area
                    );
                    info.push(element);
                  }
                }
              }
              //   console.log(info);
            }
          })
          .catch((e2) => {
            console.log("GET Live Traccar Geofences Fetching Error ", e2);
          });
        dispatch({
          type: Actions.GET_GEOFENCES,
          payload: data,
        });
      } else {
        console.log("GET Geofences Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Geofences Expections");
    });
};

export const UserLogin = (dispatch, props) => {
  // Update Section

  // Update Section
  var url = URL + "auth/login";
  console.log("URL", url);
  var data = {
    contact: props.contact,
    password: props.password,
    deviceId: props.deviceId,
  };
  axios
    .post(url, data)
    .then((res) => {
      if (res.data && res.data.result.status == 200) {
        let data = res.data;
        console.error("Data: ", data);
        Jwt.verify(data.result.data, JWT.KEY, (err, decoded) => {
          if (err) {
            console.log("Token Decocding Error");
          } else {
            // console.error("Decoded: ", decoded.user);
            localStorage.setItem("user", JSON.stringify(decoded.user));
            dispatch({
              type: Actions.USER_AUTH_LOGIN,
              payload: decoded.user,
            });
          }
        });
      } else {
        console.log("Login Response Error: ", res.data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const UserLogout = (dispatch) => {
  let a = JSON.parse(localStorage.getItem("user"));
  const url = URL + "user/update";
  axios
    .put(url, { userActivation: false, userId: a.id })
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        // console.log("Props: ", { props, url, data, code });
        localStorage.removeItem("user");
        dispatch({
          type: Actions.USER_LOGOUT,
        });
      } else {
        console.log("Update Users Invalid Response");
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const GetTraccarGroups = (dispatch) => {
  const url2 = TRACCAR + "groups";
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .get(url2, headers)
    .then((response) => {
      if (response.data) {
        let data = response.data;
        // console.log(data);
        dispatch({
          type: Actions.GET_TRACCAR_GROUPS,
          payload: data,
        });
      } else {
        console.log("GET Traccar Groups Response Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const CreateTraccarGroups = (dispatch, props) => {
  const url2 = TRACCAR + "groups";
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .post(url2, props, headers)
    .then((response) => {
      if (response.data) {
        let data = response.data;
        // console.log(data);
        dispatch({
          type: Actions.CREATE_TRACCAR_GROUPS,
        });
      } else {
        console.log("Create Traccar Groups Response Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const UpdateTraccarGroups = (dispatch, id, props) => {
  console.log("Data: ", { id, props });
  props.id = id;
  const url2 = TRACCAR + "groups/" + id;
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .put(url2, props, headers)
    .then((response) => {
      if (response.data) {
        let data = response.data;
        // console.log(data);
        dispatch({
          type: Actions.EDIT_TRACCAR_GROUPS,
        });
      } else {
        console.log("Update Traccar Groups Response Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const DelTraccarGroups = (dispatch, id) => {
  const url2 = TRACCAR + "groups/" + id;
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .delete(url2, headers)
    .then((response) => {
      if (response.data) {
        let data = response.data;
        // console.log(data);
        dispatch({
          type: Actions.DEL_TRACCAR_GROUPS,
        });
      } else {
        console.log("Delete Traccar Groups Response Error");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const polygonString = (data) => {
  var part1 = data.split("POLYGON((");
  var part2 = part1[1].split("))");
  var part3 = part2[0];
  var part4 = part3.split(", ");
  var part5 = [];
  for (let index = 0; index < part4.length; index++) {
    const element = part4[index];
    var part6 = element.split(" ");
    part5.push([Number(part6[0]), Number(part6[1])]);
  }
  return part5;
};

const fetchPolygon = (data) => {
  var info = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    var detail = {
      id: element.id,
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [polygonStringToCoords(element.area)],
        type: "Polygon",
      },
    };
    info.push(detail);
  }
  return info;
};

const makePolygonString = (coords) => {
  var line = "";
  for (let index = 0; index < coords.length; index++) {
    const element = coords[index];
    var piece = element[0] + " " + element[1];
    if (index != 0) {
      line += ", ";
    }
    line += piece;
  }
  var mainLine = "POLYGON((" + line + "))";
  return mainLine;
};

const addGeofenceInDB = (dispatch, geofenceId, serviceId) => {
  var url = URL + "geofence/add";
  var data = { geofenceId, serviceId };
  axios
    .post(url, data)
    .then((result) => {
      if (result.data) {
        console.log("Geofence Added in the Database Successfully !");
        dispatch({
          type: Actions.CREATE_TRACCAR_GEOFENCES,
        });
      } else {
        console.log("Result not found");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

export const AddGeofences = (dispatch, id, name, coords = []) => {
  var url = TRACCAR + "geofences";
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  if (id != 0) {
    var area = makePolygonString(coords);
    var data = {
      name: name,
      description: "Using CAD",
      area: area,
      calendarId: 0,
      attributes: {},
    };
    axios
      .post(url, data, headers)
      .then(async (result) => {
        if (result.data) {
          addGeofenceInDB(dispatch, result.data.id, id);
        } else {
          console.log("Result not found");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  } else {
    // ToastsStore.error("Service is Not Yet Selected !");
    console.log("Service is Not Yet Selected !");
  }
};

export const UpdateGeofences = (dispatch, id, serviceId, name, coords = []) => {
  if (true) {
    var url = TRACCAR + "geofences/" + id;
    const headers = {
      headers: {
        Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
      },
    };
    var area = makePolygonString(coords);
    var data = {
      id,
      name: name,
      description: "Cad Used",
      area: area,
      calendarId: 0,
      attributes: {},
    };
    axios
      .put(url, data, headers)
      .then((result) => {
        if (result.data) {
          // cb(result.data);
          dispatch({
            type: Actions.UPDATE_TRACCAR_GEOGENCES,
          });
        } else {
          console.log("Geofence Update Results not Found");
        }
      })
      .catch((e) => {
        console.log("Geofence Update API Error");
      });
  } else {
    // ToastsStore.error("Service is Not Yet Selected !");
    console.error("Service Not Selected");
  }
};

export const DelGeofences = (dispatch, id = 0) => {
  var url = TRACCAR + "geofences/" + id;
  // console.log(url);
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .delete(url, headers)
    .then((result) => {
      if (true) {
        // cb(true);
        // console.log("Result Deleted");
        dispatch({
          type: Actions.DEL_TRACCAR_GEOFENCES,
        });
      } else {
        console.log("Result Not Deleted");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

export const FetchAllGeofences = (dispatch) => {
  var url = TRACCAR + "geofences";
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .get(url, headers)
    .then((result) => {
      if (result.data) {
        // console.error("DATA: ", result.data);
        // let data = result.data.map((item) => {
        //   item.coords = fetchPolygon(item);
        //   return item;
        // });
        let data = fetchPolygon(result.data);
        dispatch({
          type: Actions.GET_TRACCAR_GEOFENCES,
          payload: data,
        });
      } else {
        console.log("REsult not Found");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

export const CreateServices = (dispatch, props) => {
  const url = URL + "service";
  console.log(url, props);
  axios
    .post(url, props)
    .then((response) => {
      //   console.log("Logs: ");
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_SERVICES,
        });
      } else {
        console.log("CREATE Services Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Services Expections");
    });
};
export const UpdateServices = (dispatch, id, props) => {
  const url = URL + "service/" + id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_SERVICES,
        });
      } else {
        console.log("Update Services Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Services Expections");
    });
};
export const DelServices = (dispatch, id) => {
  const url = URL + "service/" + id;
  axios
    .delete(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_SERVICES,
        });
      } else {
        console.log("DEL Services Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Services Expections");
    });
};

export const CreateSubscriptions = (dispatch, props) => {
  const url = URL + "subscription";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_SUBSCRIPTIONS,
        });
      } else {
        console.log("CREATE Subscripton Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Subscription Expections");
    });
};
export const UpdateSubscriptions = (dispatch, id, props) => {
  const url = URL + "subscription/" + id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_SUBSCRIPTIONS,
        });
      } else {
        console.log("Update Subscriptions Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Subscriptions Expections");
    });
};
export const DelSubcriptions = (dispatch, id) => {
  const url = URL + "subscription/" + id;
  axios
    .delete(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_SUBSCRIPTIONS,
        });
      } else {
        console.log("DEL Subscriptions Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Services Expections");
    });
};

export const CreateNatures = (dispatch, props) => {
  const url = URL + "nature";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_NATURES,
        });
      } else {
        console.log("CREATE Natures Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Natures Expections");
    });
};
export const UpdateNatures = (dispatch, id, props) => {
  const url = URL + "nature/" + id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_NATURES,
        });
      } else {
        console.log("Update Natures Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Natures Expections");
    });
};
export const DelNatures = (dispatch, id) => {
  const url = URL + "nature/" + id;
  axios
    .delete(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_NATURES,
        });
      } else {
        console.log("DEL Natures Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Natures Expections");
    });
};

export const CreatePanics = (dispatch, props) => {
  const url = URL + "panic";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_PANICS,
        });
      } else {
        console.log("CREATE Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Panic Expections");
    });
};
export const UpdatePanics = (dispatch, id, props) => {
  const url = URL + "panic/" + id;
  props.id = id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const SupervisorAcceptPanic_UpdatePanics = (dispatch, id, props) => {
  const url = URL + "panic/supervisorAcceptPanic";
  props.id = id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const OperatorAcceptPanic_UpdatePanics = (dispatch, id, props) => {
  const url = URL + "panic/operatorAcceptPanic";
  props.id = id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const SupervisorAssignPanicToRes_UpdatePanics = (
  dispatch,
  id,
  props
) => {
  const url = URL + "panic/supervisorAssignPanicToRes";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const OperatorAssignPanicToRes_UpdatePanics = (dispatch, id, props) => {
  const url = URL + "panic/operatorAssignPanicToRes";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const SupervisorResolvePanic_UpdatePanics = (
  dispatch,
  id,
  props = {}
) => {
  const url = URL + "panic/supervisorResolvePanic";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const OperatorResolvePanic_UpdatePanics = (dispatch, id, props = {}) => {
  const url = URL + "panic/operatorResolvePanic";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const ClosePanic_UpdatePanics = (dispatch, id, props = {}) => {
  const url = URL + "panic/closePanic";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const SolvePanic_UpdatePanics = (dispatch, id, props = {}) => {
  const url = URL + "panic/solvePanic";
  props.id = id;
  // alert(url);
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PANICS,
        });
      } else {
        console.log("Update Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Panic Expections");
    });
};
export const DelPanics = (dispatch, id) => {
  const url = URL + "panic/" + id;
  axios
    .delete(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_PANICS,
        });
      } else {
        console.log("DEL Panic Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Panic Expections");
    });
};

export const CreatePriorities = (dispatch, props) => {
  const url = URL + "priority";
  axios
    .post(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_PRIORITIES,
        });
      } else {
        console.log("CREATE Priorities Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Priorities Expections");
    });
};
export const UpdatePriorities = (dispatch, id, props) => {
  const url = URL + "priority/" + id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_PRIORITIES,
        });
      } else {
        console.log("Update Priorities Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Priorities Expections");
    });
};
export const DelPriorities = (dispatch, id) => {
  const url = URL + "priority/" + id;
  axios
    .delete(url)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_PRIORITIES,
        });
      } else {
        console.log("DEL Priorities Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Priorities Expections");
    });
};

export const changeZoom = (dispatch, data) => {
  let zoom = localStorage.getItem("zoom");
  if (zoom && zoom > 0) {
    dispatch({
      type: Actions.CHANGE_ZOOM_LEVEL,
      payload: data,
    });
  } else {
    // localStorage.setItem("zoom", data);
    dispatch({
      type: Actions.CHANGE_ZOOM_LEVEL,
      payload: data,
    });
  }
};

export const GetCenter = (dispatch, data) => {
  var url = URL + "geo/find-center";
  axios
    .post(url, { data })
    .then(async (response) => {
      var info = response.data.result.data;
      console.log("Access2: ", info);
      dispatch({
        type: Actions.GET_CENTER,
        payload: {
          latitude: info.latitude,
          longitude: info.longitude,
        },
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const ChangeGeoLatLng = (dispatch, data) => {
  dispatch({
    type: Actions.CHANGE_GEO_LAT_LNG,
    payload: data,
  });
};

const CreateResponders = (dispatch, props) => {
  const url = URL + "user/responder-register";
  console.error("Props: ", props);
  axios
    .post(url, props)
    .then((response) => {
      console.error("Db: ", response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.CREATE_RESPONDERS,
        });
      } else {
        console.log("CREATE Responder Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Responders Expections");
    });
};
export const CreateTraccarResponders = (dispatch, props, pass) => {
  const url = TRACCAR + "devices";
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  console.error({ url, headers, props });
  axios
    .post(url, props, headers)
    .then(async (response) => {
      console.error(response.data);
      let data = response.data;
      // let code = response.data.result.status;
      console.error("Data: ", data);
      if (data != null) {
        await CreateResponders(dispatch, {
          firstname: data.name,
          lastname: data.name,
          contact: data.phone,
          password: pass,
          lat: 0,
          lng: 0,
          trackingId: Number(data.id) || 0,
          uniqueId: data.uniqueId,
        });
        // dispatch({
        //   type: Actions.CREATE_TRACCAR_RESPONDERS,
        // });
      } else {
        console.log("CREATE Traccar Responder Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Create Traccar Responders Expections");
    });
};
export const UpdateTraccarResponders = (dispatch, id, props) => {
  const url = URL + "devices/" + id;
  props.id = id;
  axios
    .put(url, props)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.EDIT_TRACCAR_RESPONDERS,
        });
      } else {
        console.log("Update Traccar Responders Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Update Traccar Responders Expections");
    });
};
export const DelTraccarResponders = (dispatch, id) => {
  const url = TRACCAR + "devices/" + id;
  const headers = {
    headers: {
      Authorization: "Basic " + TRAC_ACCOUNT_ENCODED,
    },
  };
  axios
    .delete(url, headers)
    .then((response) => {
      console.error(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.DEL_TRACCAR_RESPONDERS,
        });
      } else {
        console.log("DEL Traccar Responders Invalid Response");
      }
    })
    .catch((e) => {
      console.error("DEL Traccar Responders Expections");
    });
};

export const GetGeoDistances = (dispatch, single, list) => {
  const url = URL + "geo/find-distance";
  const data = {
    data: {
      latitude: single.latitude,
      longitude: single.longitude,
      list: [...list],
    },
  };
  axios
    .post(url, data)
    .then((response) => {
      //   console.log(response.data);
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_GEO_DISTANCES,
          payload: data,
        });
      } else {
        console.log("Geo Distances Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Geo Distances Expections");
    });
};

export const GetNotificationLogs = (dispatch) => {
  const url = URL + "notification-logs";
  axios
    .get(url)
    .then((response) => {
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_NOTIFICATION_LOGS,
          payload: data,
        });
      } else {
        console.log("GET Notification Logs Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Notification Logs Expections");
    });
};

export const GetChatLogs = (dispatch) => {
  const url = URL + "chat-logs";
  axios
    .get(url)
    .then((response) => {
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_CHAT_LOGS,
          payload: data,
        });
      } else {
        console.log("GET Chat Logs Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Chat Logs Expections");
    });
};

export const GetEventLogs = (dispatch) => {
  const url = URL + "event-logs";
  axios
    .get(url)
    .then((response) => {
      let data = response.data.result.data;
      let code = response.data.result.status;
      if (code == 200) {
        dispatch({
          type: Actions.GET_EVENT_LOGS,
          payload: data,
        });
      } else {
        console.log("GET Event Logs Invalid Response");
      }
    })
    .catch((e) => {
      console.error("Get Event Logs Expections");
    });
};
//new fuction
export const postNotification = (data) => {
  const url = URL + "privatenotification/add";
  axios
    .post(url, data)
    .then((res) => {
      window.alert("Notification is posted");
    })
    .catch((err) => {
      window.alert("Error in notification posting");
    });
};
export const GetNotification = async () => {
  const url = URL + "privatenotification/getall";
  await axios
    .get(url)
    .then((res) => {
      var result = res.result.data;
      return result;
    })
    .catch((err) => {
      window.alert("Error in notification posting");
    });
};

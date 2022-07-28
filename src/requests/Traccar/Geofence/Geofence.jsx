import axios from "axios";
import { Traccar, Url } from "./../../../configs/configs";
import { encode, decode } from "base-64";
import { ToastsStore } from "react-toasts";

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
    var detail = polygonString(element.area);
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

const addGeofenceInDB = (geofenceId, serviceId, cb) => {
  var url = Url + "geofence/add";
  var data = { geofenceId, serviceId };
  axios
    .post(url, data)
    .then((result) => {
      if (result.data) {
        console.log("Geofence Added in the Database Successfully !");
      } else {
        console.log("Result not found");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

export const addGeofences = (
  user = "",
  pass = "",
  serviceId,
  name,
  coords = [],
  cb = null
) => {
  if (serviceId != 0) {
    var url = Traccar + "geofences";
    var area = makePolygonString(coords);
    var data = {
      name: name,
      description: "veryGood",
      area: area,
      calendarId: 0,
      attributes: {},
    };

    var tokenString = user + ":" + pass;
    var token = encode(tokenString);

    axios
      .post(url, data, { headers: { Authorization: "Basic " + token } })
      .then((result) => {
        if (result.data) {
          addGeofenceInDB(result.data.id, serviceId, () => {
            cb(result.data);
          });
        } else {
          console.log("Result not found");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  } else {
    ToastsStore.error("Service is Not Yet Selected !");
  }
};

export const updateGeofences = (
  id,
  user = "",
  pass = "",
  serviceId,
  name,
  coords = [],
  cb = null
) => {
  if (serviceId != 0) {
    var url = Traccar + "geofences/" + id;
    var area = makePolygonString(coords);
    var data = {
      id,
      name: name,
      description: "veryGood",
      area: area,
      calendarId: 0,
      attributes: {},
    };

    var tokenString = user + ":" + pass;
    var token = encode(tokenString);

    axios
      .put(url, data, { headers: { Authorization: "Basic " + token } })
      .then((result) => {
        if (result.data) {
          cb(result.data);
        } else {
          console.log("Result not found");
        }
      })
      .catch((e) => {
        console.log("Error");
      });
  } else {
    // ToastsStore.error("Service is Not Yet Selected !");
  }
};

export const fetchAllGeofence = (user = "", pass = "", cb = null) => {
  console.error("Calling API");
  var url = Traccar + "geofences";
  var tokenString = user + ":" + pass;
  var token = encode(tokenString);

  axios
    .get(url, { headers: { Authorization: "Basic " + token } })
    .then((result) => {
      if (result.data) {
        console.error("Error: ", result.data);
        cb(result.data);
      } else {
        console.log("REsult not Found");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

export const deleteGeofences = (user = "", pass = "", id = 0, cb = null) => {
  var url = Traccar + "geofences/" + id;
  // console.log(url);
  var tokenString = user + ":" + pass;
  var token = encode(tokenString);

  axios
    .delete(url, { headers: { Authorization: "Basic " + token } })
    .then((result) => {
      if (true) {
        cb(true);
        console.log("Result Deleted");
      } else {
        console.log("Result Not Deleted");
      }
    })
    .catch((e) => {
      console.log("Error");
    });
};

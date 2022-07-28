import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY, Traccar } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";
import { encode } from "base-64";

export const getAllLocations = (cb = null) => {
  var url = Url + "responder";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("Error While Fetching Loactions of all Responders");
      }
    })
    .catch((e2) => {
      ToastsStore.error("All Responder Location Request Error");
    });
};

export const getAllLocationsFromTraccar = async (cb = null) => {
  var url = Url + "responder/all";
  await axios
    .post(url)
    .then(async (result) => {
      if (result.data && result.data.result.status == "200") {
        var y = result.data.result.data;
        // ToastsStore.success("Panic Logs Fetched Successfully");
        console.error("Devices: ", y);
        if (cb != null) cb(y);
      } else {
        // ToastsStore.error("Error While Fetching Loactions of all Responders");
      }
    })
    .catch((e2) => {
      // ToastsStore.error("All Responder Location Request Error");
    });
};

export const getFreeLocations = (cb = null) => {
  var url = Url + "responder/free";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Error While Fetching Loactions of all Responders");
      }
    })
    .catch((e) => {
      // ToastsStore.error("All Responder Location Request Error");
    });
};

export const getBuzyLocations = (cb = null) => {
  var url = Url + "responder/busy";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Error While Fetching Loactions of all Responders");
      }
    })
    .catch((e) => {
      // ToastsStore.error("All Responder Location Request Error");
    });
};

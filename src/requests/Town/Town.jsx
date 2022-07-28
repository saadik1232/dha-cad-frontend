import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";

export const getTowns = (cb = null) => {
  var url = Url + "town";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Town Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Town Request Error");
    });
};

export const addTown = (data, cb = null) => {
  var url = Url + "town";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("New Town Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Town Creation Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Town Creation Request Error");
    });
};

export const updateTown = (id, data, cb = null) => {
  var url = Url + "town/" + id;
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("New Town Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Town Updation Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Town Updation Request Error");
    });
};

export const delTown = (id, cb = null) => {
  var url = Url + "town/" + id;
  axios
    .delete(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("Town Deleted Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Town Deletion Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Town Deletion Request Error");
    });
};

import axios from "axios";
import { Url } from "./../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep1, Beep2, Beep3, Beep4 } from "./../../Beeper/Beeper";

export const getAllPanics = (cb = null) => {
  var url = Url + "panic";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Generated Successfully !");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Panics Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Panics Request Error");
    });
};

export const updatePanic = (id, data, cb = null) => {
  var url = Url + "panic/" + id;
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Generated Successfully !");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("Panics Fetching Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Panics Request Error");
    });
};

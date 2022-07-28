import axios from "axios";
import { Url } from "./../../configs/configs";
import { ToastsStore } from "react-toasts";

const StdResAction = (res, success = "Successfull", err = true, cb = null) => {
  if (res.data) {
    if (res.data.result.status == "200") {
      if (success != "") ToastsStore.success(success);
      if (cb != null) cb(res.data.result.data, res.data.result.message);
    } else {
      // if (err) ToastsStore.error(res.data.result.status + " Error !");
    }
  } else {
    // if (err) ToastsStore.error(err);
  }
};

export const fetchOne = (id, cb = null) => {
  var url = Url + "role/" + id;
  axios
    .get(url)
    .then((res) => {
      StdResAction(res, "", false, cb);
    })
    .catch((e) => {
      // ToastsStore.error("Error !");
    });
};

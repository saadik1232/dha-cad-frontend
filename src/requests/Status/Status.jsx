import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";

export const getStatuses = (cb = null) => {
  var url = Url + "status";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Status Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Status Request Error");
    });
};

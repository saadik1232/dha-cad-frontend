import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";

export const getSubscriptions = (cb = null) => {
  var url = Url + "subscription";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Subscription Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Subscription Request Error");
    });
};

export const addSubscription = (data, cb = null) => {
  var url = Url + "subscription";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("New Subscription Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("Subscription Creation Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Subscription Creation Request Error");
    });
};

export const updateSubscription = (id, data, cb = null) => {
  var url = Url + "subscription/" + id;
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("New Subscription Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("Subscription Updation Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Subscription Updation Request Error");
    });
};

export const delSubscription = (id, cb = null) => {
  var url = Url + "subscription/" + id;
  axios
    .delete(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("Subscription Deleted Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("Subscription Deletion Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Subscription Deletion Request Error");
    });
};

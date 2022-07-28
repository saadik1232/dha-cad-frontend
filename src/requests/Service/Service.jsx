import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";

export const getFilteredServices = (data, cb = null) => {
  var url = Url + "service/search";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Filtered Services Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Filtered Services Request Error");
    });
};

export const getServices = (cb = null) => {
  var url = Url + "service";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Services Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Services Request Error");
    });
};

export const getServiceAppliers = (cb = null) => {
  var url = Url + "service/find/applied";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Service Appliers Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Services Appliers Request Error");
    });
};

export const delService = (id, cb = null) => {
  var url = Url + "service/" + id;
  axios
    .delete(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb();
      } else {
        ToastsStore.error("Service Deletion Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Service Deletion Request Error");
    });
};

export const addService = (data, cb = null) => {
  var url = Url + "service";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb();
      } else {
        ToastsStore.error("Service Creation Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Service Creation Request Error");
    });
};

export const editService = (id, data, cb = null) => {
  var url = Url + "service/" + id;
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb();
      } else {
        ToastsStore.error("Service Updatioin Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("Service Updation Request Error");
    });
};

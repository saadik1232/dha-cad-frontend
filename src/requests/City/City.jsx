import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../Beeper/Beeper";

export const getCities = (cb = null) => {
  var url = Url + "city";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("City Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("City Request Error");
    });
};

export const addCity = (data, cb = null) => {
  var url = Url + "city";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("New City Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("City Creation Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("City Creation Request Error");
    });
};

export const updateCity = (id, data, cb = null) => {
  var url = Url + "city/" + id;
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("New City Created Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("City Updation Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("City Updation Request Error");
    });
};

export const delCity = (id, cb = null) => {
  var url = Url + "city/" + id;
  axios
    .delete(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("City Deleted Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        ToastsStore.error("City Deletion Error");
      }
    })
    .catch((e) => {
      ToastsStore.error("City Deletion Request Error");
    });
};

export const getFilteredCity = (id, cb = null) => {
  var url = Url + "city/" + id;
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
        else return result.data.result.data;
      } else {
        // ToastsStore.error("City Filtered Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("City Filtered Request Error");
    });
};

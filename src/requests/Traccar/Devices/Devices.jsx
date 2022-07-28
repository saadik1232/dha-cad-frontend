import axios from "axios";
import JWT from "jsonwebtoken";
import _ from "lodash";
import { encode } from "base-64";
import { Min, KEY } from "../../../configs/configs";
import { Url, Traccar } from "../../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "../../../Beeper/Beeper";
import {
  RegisterResponder,
  delUser,
  UpdateUserWithoutUser,
  delUserByUnique,
} from "./../../../requests/User/User";

export const getDevices = (cb = null) => {
  var user = "admin";
  var pass = "L@s3rjet9045";
  var url = Traccar + "devices";
  var token = "Basic " + encode(user + ":" + pass);
  console.error(url, token);
  axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      if (cb != null) cb(result.data);
    })
    .catch((e) => {
      // ToastsStore.error("Traccar Devices Request Error");
    });
};

export const addDevices = async (data, data2, cb = null) => {
  var user = "admin";
  var pass = "L@s3rjet9045";
  var url = Traccar + "devices";
  var url2 = Traccar + "positions";
  var token = "Basic " + encode(user + ":" + pass);
  console.error(url, token);
  await axios
    .post(url, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(async (result) => {
      alert("Unique: " + data.uniqueId);
      // alert(result.data.id);
      await RegisterResponder(
        {
          ...result.data,
          ...data2,
          lat: 31.5204,
          lng: 74.3587,
          roleId: 4,
          trackingId: result.data.id,
          uniqueId: data.uniqueId,
        },
        (DATA) => {
          if (cb != null) cb(result.data);
        }
      );
    })
    .catch((e) => {
      // ToastsStore.error("Traccar Devices Request Error");
    });
};

export const editDevices = (id, data, data2, cb = null) => {
  var user = "admin";
  var pass = "L@s3rjet9045";
  var url = Traccar + "devices/" + id;
  var token = "Basic " + encode(user + ":" + pass);
  console.error(url, token);
  axios
    .put(url, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      // update({ ...result.data }, () => {
      if (cb != null) cb(result.data);
      // });
    })
    .catch((e) => {
      // ToastsStore.error("Traccar Devices Request Error");
    });
};

export const delDevice = (data, cb = null) => {
  // alert("Id");
  // alert(data.id);
  // alert("unique");
  // alert(data.unique);
  // alert("next");
  var user = "admin";
  var pass = "L@s3rjet9045";
  var url = Traccar + "devices/" + data.id;
  var token = "Basic " + encode(user + ":" + pass);
  // console.error(url, token);
  axios
    .delete(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      // alert(data.unique);
      delUserByUnique(data.id, (result) => {
        if (cb != null) cb();
      });
    })
    .catch((e) => {
      // ToastsStore.error("Traccar Devices Deletion Request Error");
    });
};

export const getPositions = async (
  user = "admin",
  pass = "L@s3rjet9045",
  cb = null
) => {
  var url = Traccar + "positions";
  await axios
    .get(url, {
      headers: {
        Authorization: "Basic " + encode(user + ":" + pass),
      },
    })
    .then((result) => {
      if (cb != null) cb(result.data);
      //   return result.data;
      //   if (result.data && result.data.result.status == "200") {
      //     // ToastsStore.success("Panic Logs Fetched Successfully");
      //     if (cb != null) cb(result.data.result.data);
      //   } else {
      //     ToastsStore.error("City Fetching Error");
      //   }
    })
    .catch((e) => {
      // ToastsStore.error("Traccar Devices Request Error");
    });
};

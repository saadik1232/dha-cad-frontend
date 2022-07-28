import axios from "axios";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { login, JwtDecode } from "../Login/Login";

export const UpdateUser = (data, cb = null) => {
  // console.error("Image: ", data.image);
  var url = Url + "user/update";
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("User Updated Successfuly");
        login(data.contact, data.password, async (data) => {
          if (data != null) {
            JwtDecode(data, async (decode) => {
              await localStorage.setItem("user", JSON.stringify(decode.user));
              // ToastsStore.success(
              //   "User Authentication Token Renewed Successfully"
              // );
              if (cb != null) cb(data);
            });
          } else {
            // ToastsStore.error("Authentication Token Renewal Error");
          }
        });
      } else {
        // ToastsStore.error("User Updation Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("User Request Error");
    });
};

export const UpdateUserWithoutUser = (data, cb = null) => {
  // console.error("Image: ", data.image);
  var url = Url + "user/update";
  axios
    .put(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("User Updated Successfuly");
      } else {
        // ToastsStore.error("User Updation Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("User Request Error");
    });
};

export const delUser = (id, data, cb = null) => {
  // console.error("Image: ", data.image);
  var url = Url + "user/del/" + id;
  axios
    .delete(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("User Deleted Successfuly");
      } else {
        // ToastsStore.error("User Deleted Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("User Deletion Request Error");
    });
};

export const delUserByUnique = (id, cb = null) => {
  // console.error("Image: ", data.image);
  var url = Url + "user/del/unique";
  axios
    .post(url, { id })
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("User Deleted Successfuly");
      } else {
        // ToastsStore.error("User Deleted Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("User Deletion Request Error");
    });
};

export const getUsers = (cb = null) => {
  var url = Url + "user/all";
  axios
    .get(url)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        // ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
        else return result.data.result.data;
      } else {
        // ToastsStore.error("Users Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Users Request Error");
    });
};

export const RegisterResponder = (data, cb = null) => {
  // console.log("Bilal Data: ", data);
  alert("Inside Devices: " + data.trackingId);
  data = {
    password: data.password,
    firstname: data.name,
    lastname: "",
    email: "",
    cnic: "",
    contact: data.contact,
    lat: data.lat,
    lng: data.lng,
    trackingId: data.trackingId,
    uniqueId: data.uniqueId,
    city: "",
    town: "",
    street: "",
    house: "",
    roleId: 5,
    mapAddress: "",
    deviceId: null,
    fcmToken: null,
  };
  var url = Url + "user/responder-register";
  axios
    .post(url, data)
    .then((result) => {
      if (result.data && result.data.result.status == "200") {
        ToastsStore.success("Panic Logs Fetched Successfully");
        if (cb != null) cb(result.data.result.data);
      } else {
        // ToastsStore.error("Users Fetching Error");
      }
    })
    .catch((e) => {
      // ToastsStore.error("Users Request Error");
    });
};

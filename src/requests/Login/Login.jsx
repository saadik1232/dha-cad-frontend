import axios from "axios";
import JWT from "jsonwebtoken";
import { Min, KEY } from "./../../configs/configs";
import { Url } from "../../configs/configs";
import { ToastsStore } from "react-toasts";
import { Beep4, Beep2, Beep3, Beep1 } from "./../../Beeper/Beeper";

const def = () => {
  return "";
};

const StdResAction = (res, cb = null) => {
  if (res.data) {
    // console.log("Login");
    // return;
    if (res.data.result.status == "200") {
      ToastsStore.success("Login Successfull !");
      Beep2();
      if (cb != null) cb(res.data.result.data, res.data.result.message);
    } else {
      ToastsStore.error(res.data.result.status + " Error !");
      cb(null, null);
    }
  } else {
    ToastsStore.error("No Response Error !");
    cb(null, null);
  }
};

export const login = (contact, password, deviceId, cb = null) => {
  var url = Url + "auth/login";
  var data = { contact, password, deviceId };
  axios
    .post(url, data)
    .then((res) => {
      StdResAction(res, cb);
    })
    .catch((e) => {
      ToastsStore.error("Error !");
    });
};

export const JwtDecode = (data, cb = null) => {
  JWT.verify(data, KEY, (err, decoded) => {
    if (err) {
      ToastsStore.error("Jwt Decoding Error !");
    }
    if (cb != null) cb(decoded);
  });
};

export default def;

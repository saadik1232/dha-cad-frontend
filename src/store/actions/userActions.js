import * as Actions from "../actionTypes";
import axios from "axios";
import jwt from "jsonwebtoken";
import { URL } from "../../config/config";
const KEY = "123456";

/* Handlers */
const userLoginHandler = (user) => {
  return {
    type: Actions.USER_LOGIN,
    user: user,
  };
};
const tokenDecodeHandler = (decoded) => {
  return {
    type: Actions.DECODE_JWT,
    token: decoded,
  };
};

/* Exports */
export const userLogin = (user) => {
  return (dispatch) => {
    var url = URL + "/auth/login";
    axios
      .post(url, { ...user, roleId: 3 })
      .then((response) => {
        //console.log("response from user actions");
        if (response.data) {
          localStorage.setItem("jwtToken", response.data.result.data);
          window.location.reload();
          dispatch(userLoginHandler(response.data.result.data));
        } else {
          dispatch(userLoginHandler(null));
        }
      })
      .catch((e) => {
        dispatch(userLoginHandler(null));
      });
  };
};

export const tokenDecode = (token) => {
  return (dispatch) => {
    jwt.verify(token, KEY, (err, decoded) => {
      if (err) {
        dispatch(tokenDecodeHandler(null));
      } else {
        dispatch(tokenDecodeHandler(decoded));
      }
    });
  };
};

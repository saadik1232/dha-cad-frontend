import * as Actions from "../actionTypes";
import axios from "axios";
import jwt from "jsonwebtoken";
import { URL } from "../../config/config";
const KEY = "123456";

/* Handlers */
const generatePanicHandler = panic => {
  return {
    type: Actions.PANIC_GENERATION,
    panic: panic
  };
};

/* Exports */
export const generatePanic = panic => {
  console.log("API");
  return dispatch => {
    var url = URL + "/panics";
    panic.operatorId = 0;
    panic.supervisorId = 0;
    axios
      .post(url, panic)
      .then(response => {
        if (response.data.result.status == "200") {
          dispatch(generatePanicHandler(response.data.result.data));
        } else {
          dispatch(generatePanicHandler(null));
        }
      })
      .catch(e => {
        dispatch(generatePanicHandler(null));
      });
  };
};

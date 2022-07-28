module.exports.CheckIfEmpty = (data) => {
  if (
    data != null &&
    data != 0 &&
    data != "" &&
    data != {} &&
    typeof data != "undefined" &&
    data != []
  ) {
    return true;
  } else {
    return false;
  }
};

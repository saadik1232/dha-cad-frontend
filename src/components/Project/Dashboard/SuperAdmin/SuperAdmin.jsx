import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TopBar from "./TopBar/TopBar";
import { UserLogout } from "./../../../../actions/index";
import Groups from "./Groups/Groups";
import Users from "./Users/Users";
import Wall from "./Wall/Wall";

const SuperAdmin = (props) => {
  console.log("Super Admin Panel");

  return (
    <>
      <TopBar />
      <Groups />
      <Users />
      <Wall />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);

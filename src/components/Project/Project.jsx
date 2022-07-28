import React from "react";
import Login from "./Login/Login";
import { connect } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";

const Project = (props) => {
  console.log("Main Project Component");

  const changeUI = () => {
    if (props.user == null) {
      return <Login />;
    } else {
      return <Dashboard />;
    }
  };

  return <>{changeUI()}</>;
};

const mapStateToProps = (state) => ({
  user: state.logger,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Project);

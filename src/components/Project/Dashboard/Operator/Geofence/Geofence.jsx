import React, { useEffect } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
import { UserLogout, FetchAllGeofences } from "./../../../../../actions/index";
import Map from "./Map/Map";

const Geofence = (props) => {
  return (
    <>
      <Modal
        close={false}
        big={true}
        name={"geofence"}
        title={{ name: "Geofence", symbol: "globe" }}
      >
        <Map />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  //   traccarGeofences: state.traccarGeofences,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  //   fetchAllGeofences: () => FetchAllGeofences(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Geofence);

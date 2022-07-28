import React, { useState } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
import {
  ChangeGeoLatLng,
  UpdateUsers,
  GetUsers,
} from "./../../../../../actions/index";

const Applications = (props) => {
  const [filter, setFilter] = useState(false);

  const getTableData = (data) => {
    let info = data.reverse();
    if (filter) {
      info = info.filter((item) => item.approval == 1);
    } else {
      info = info.filter((item) => item.approval == null || item.approval == 0);
    }
    return info.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
            <td> {item.firstname + " " + item.lastname} </td>
            <td> {item.cnic} </td>
            <td> {item.contact} </td>
            <td> {item.email} </td>
            <td> {item.password} </td>
            <td> {item.lat} </td>
            <td> {item.lng} </td>
            <td> {item.address} </td>
            <td> {item.userActivation} </td>
            <td> {item.userAssignment} </td>
            <td> {item.serviceId} </td>
            <td>{item.subscriptionId}</td>
            <td> {item.deviceId} </td>
            <td> {item.custId} </td>
            <td> {item.image} </td>
            <td> {item.trackingId} </td>
            <td> {item.uniqueId} </td>
            <td>
              <span
                className=""
                onClick={() =>
                  props.changeGeoLatLng({
                    lat: Number(item.lat),
                    lng: Number(item.lng),
                  })
                }
                data-toggle="modal"
                data-target="#geo"
              >
                <i className="fa fa-globe"></i>
              </span>
            </td>
            <td>
              <span
                onClick={async () => {
                  await props.updateUsers(item.id, {
                    approval: item.approval == 1 ? 0 : 1,
                  });
                  await props.getUsers();
                }}
              >
                {item.approval != null &&
                item.approval != 0 &&
                item.approval != false ? (
                  <i className="fa fa-toggle-on"></i>
                ) : (
                  <i className="fa fa-toggle-off"></i>
                )}
              </span>
            </td>
            {/* <td> </td> */}
            {/* <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => edit(item.id)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => del(item.id)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td> */}
          </tr>
        </React.Fragment>
      );
    });
  };

  const getTable = (data) => {
    return (
      <React.Fragment>
        <div style={{ overflow: "auto" }} className="">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Name </th>
                <th> CNIC </th>
                <th> Contact </th>
                <th> Email </th>
                <th> Password </th>
                <th> Lat </th>
                <th> Lng </th>
                <th> Address </th>
                <th> User Activation </th>
                <th> User Assignment </th>
                <th> Service </th>
                <th> Subscription </th>
                <th> Device </th>
                <th> Parent </th>
                <th> Image </th>
                <th> Tracking Id </th>
                <th> Unique </th>
                <th> Geofence </th>
                <th> Approval </th>
                {/* <th> - </th>
                    <th> - </th> */}
              </tr>
            </thead>
            <tbody>{getTableData(data)}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  };

  return (
    <>
      <Modal
        close={false}
        big={true}
        name={"applications"}
        title={{ name: "Applications", symbol: "file" }}
      >
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setFilter((item) => !item)}
          >
            Filter
          </button>
        </div>
        <br />
        {getTable(props.customers)}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  customers: state.customers,
});

const mapDispatchToProps = (dispatch) => ({
  changeGeoLatLng: (data) => ChangeGeoLatLng(dispatch, data),
  updateUsers: (id, data) => UpdateUsers(dispatch, id, data),
  getUsers: () => GetUsers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Applications);

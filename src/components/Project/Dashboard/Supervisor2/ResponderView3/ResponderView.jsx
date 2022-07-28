import React, { useEffect } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
import { GetAllResponder } from "./../../../../../actions/index";

const ResponderView = (props) => {
  console.log("Supervisor - Responder View");

  const init = async () => {
    // await props.getResponders();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  const getTableData = (data) => {
    return data.map((item, index) => {
      if (item.db != null) {
        return (
          <React.Fragment key={index}>
            <tr>
              <td> {item.id} </td>
              <td>
                {" "}
                {item.db.firstname + " " + item.db.lastname} ( {item.name} ){" "}
              </td>
              <td> {item.db.cnic} </td>
              <td> {item.db.contact} </td>
              <td> {item.db.email} </td>
              <td> {item.db.password} </td>
              <td> {item.lat} </td>
              <td> {item.lng} </td>
              <td> {item.db.address} </td>
              <td> {item.db.userActivation} </td>
              <td> {item.db.userAssignment} </td>
              <td> {item.db.serviceId} </td>
              <td> {item.db.subscriptionId} </td>
              <td> {item.db.deviceId} </td>
              <td> {item.db.custId} </td>
              <td> {item.db.image} </td>
              <td> {item.db.trackingId} </td>
              <td> {item.db.uniqueId} </td>
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
      } else {
        return null;
      }
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
        name={"responderView"}
        title={{ name: "Responders", symbol: "car" }}
      >
        {getTable([...props.online, ...props.offline, ...props.unknown])}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  // customers: state.customers,
  online: state.onlineResponders,
  offline: state.offlineResponders,
  unknown: state.unknownResponders,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResponderView);

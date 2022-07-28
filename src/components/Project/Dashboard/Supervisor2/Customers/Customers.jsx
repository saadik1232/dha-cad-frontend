import React from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";

const Customers = (props) => {
  console.log("Supervisor - Customers");

  const getTableData = (data) => {
    return data.map((item, index) => {
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
            <td> {item.subscriptionId} </td>
            <td> {item.deviceId} </td>
            <td> {item.custId} </td>
            <td> {item.image} </td>
            <td> {item.trackingId} </td>
            <td> {item.uniqueId} </td>
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
        name={"customers"}
        title={{ name: "Customers", symbol: "users" }}
      >
        {getTable(props.customers)}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  customers: state.customers,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  GetSubscriptions,
  DelSubcriptions,
} from "../../../../../../actions/index";

const List = (props) => {
  console.log("Supervisor - Subscriptions List");

  const [page, setPage] = useState("main");

  const del = async (id) => {
    await props.delSubcriptions(id);
    setTimeout(() => {
      props.getSubscriptions();
    }, 500);
  };

  const edit = (id) => {
    props.setId(id);
    props.setPage("add");
  };

  const getTableData = () => {
    return props.subscriptions.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
            <td> {item.title} </td>
            <td> {item.description} </td>
            <td> {item.cost} </td>
            <td> {item.duration} </td>
            <td> {item.usersAllowed} </td>
            <td> {item.devicesAllowed} </td>
            <td> {item.service.name} </td>
            <td>
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
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  const getTable = () => {
    return (
      <React.Fragment>
        <div style={{ height: "400px", overflow: "auto" }}>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Name </th>
                <th> Description </th>
                <th> Cost </th>
                <th> Duration </th>
                <th> User Allowed </th>
                <th> Devices Allowed </th>
                <th> Service </th>
                <th> - </th>
                <th> - </th>
              </tr>
            </thead>
            <tbody>{getTableData()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  };

  return <>{getTable()}</>;
};

const mapStateToProps = (state) => ({
  user: state.logger,
  subscriptions: state.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  detSubscriptions: () => GetSubscriptions(dispatch),
  delSubcriptions: (id) => DelSubcriptions(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

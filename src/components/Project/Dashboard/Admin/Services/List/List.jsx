import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  GetServices,
  DelServices,
} from "../../../../../../actions/index";

const List = (props) => {
  console.log("Supervisor - Services List");

  const [page, setPage] = useState("main");

  const del = async (id) => {
    await props.delServices(id);
    setTimeout(() => {
      props.getServices();
    }, 500);
  };

  const edit = (id) => {
    props.setId(id);
    props.setPage("add");
  };

  const getTableData = () => {
    return props.services.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
            <td> {item.name} </td>
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
  services: state.services,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  getServices: () => GetServices(dispatch),
  delServices: (id) => DelServices(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

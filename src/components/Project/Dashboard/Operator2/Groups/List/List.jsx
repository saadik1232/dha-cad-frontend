import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UserLogout } from "../../../../../../actions/index";
import {
  GetTraccarGroups,
  DelTraccarGroups,
} from "../../../../../../actions/index";

const List = (props) => {
  console.log("Supervisor - Group List");

  const [page, setPage] = useState("main");

  const del = async (id) => {
    await props.delTraccarGroups(id);
    setTimeout(() => {
      props.getTraccarGroups();
    }, 100);
  };

  const edit = (id) => {
    props.setId(id);
    props.setPage("add");
  };

  const getTableData = () => {
    return props.groups.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
            <td> {item.name} </td>
            <td> {item.groupId} </td>
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
                <th> Group Id </th>
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
  groups: state.groups,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getTraccarGroups: () => GetTraccarGroups(dispatch),
  delTraccarGroups: (id) => DelTraccarGroups(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

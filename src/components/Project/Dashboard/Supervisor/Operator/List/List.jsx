import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  UserLogout,
  GetUsers,
  DelUsers,
} from "../../../../../../actions/index";
import _ from "lodash";

const List = (props) => {
  console.log("Supervisor - Operator List");

  const [page, setPage] = useState("main");

  const del = async (id) => {
    await props.delUsers(id);
    setTimeout(() => {
      props.getUsers();
    }, 500);
  };

  const edit = (id) => {
    props.setId(id);
    props.setPage("add");
  };

  // const getOperss = () => {
  //   let groupIds = props.groups.map((item) => item.id);
  //   let result = props.operators.filter((item) => {
  //     let group = Number(item.groupId);
  //     if (_.includes(groupIds, group)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   console.error(result);
  //   return result;
  // };

  const getTableData = () => {
    return props.operators.map((item, index) => {
      let color = item.userActivation == 1 ? "lightgreen" : "#eee";
      return (
        <React.Fragment key={index}>
          <tr style={{ background: color }}>
            <td> {item.id} </td>
            <td> {item.firstname + " " + item.lastname} </td>
            <td> {item.contact} </td>
            <td> {item.email} </td>
            <td> {item.password} </td>
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
                <th> Contact </th>
                <th> Email </th>
                <th> Password </th>
                <th> Group </th>
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
  groups: state.groups.filter((item) => item.groupId == state.logger.groupId),
  operators: state.operators,
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  getUsers: () => GetUsers(dispatch),
  delUsers: (id) => DelUsers(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

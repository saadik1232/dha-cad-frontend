import React, { useEffect, useState } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
// import {  } from './../../../../../actions/index'
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import ReactTimeAgo from "react-time-ago";
JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

const compareDate = (date1, date2, type = "equal") => {
  let x = new Date(date1);
  let y = new Date(date2);
  if (type == "greater") {
    return +x > +y;
  } else if (type == "lesser") {
    return +x < +y;
  } else {
    return +x == +y;
  }
};

const NotificationLogs = (props) => {
  console.log("Supervisor - Notification Logs");

  //   const [start, setStart] = useState("");
  //   const [end, setEnd] = useState("");

  const init = async () => {
    // await props.getPanics();
  };

  useEffect(() => {
    // init();
    return;
  }, []);

  // const filterNature = (id) => {
  //   let data = props.natures.filter((item) => item.id == id);
  //   if (data.length > 0) {
  //     return data[0];
  //   } else {
  //     return null;
  //   }
  // };

  // const filterPriority = (id) => {
  //   let data = props.priorities.filter((item) => item.id == id);
  //   if (data.length > 0) {
  //     return data[0];
  //   } else {
  //     return null;
  //   }
  // };

  //   const filterResponders = (id) => {
  //     let data = props.online.filter((item) => item.id == id);
  //     if (data.length > 0) {
  //       return data[0];
  //     } else {
  //       return null;
  //     }
  //   };

  //   const filterOperators = (id) => {
  //     let data = props.operators.filter((item) => item.id == id);
  //     if (data.length > 0) {
  //       return data[0];
  //     } else {
  //       return null;
  //     }
  //   };

  const filterUsers = (id) => {
    let data = props.users.filter((item) => item.id == id);
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  };

  const getTableData = (data) => {
    return data.reverse().map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td> {item.id} </td>
            <td> {item.Title} </td>
            <td> {item.Message} </td>
            <td>
              {filterUsers(item.sendUserId)
                ? filterUsers(item.sendUserId).firstname +
                  " " +
                  filterUsers(item.sendUserId).lastname
                : null}
            </td>
            <td>
              {filterUsers(item.recieveUserId)
                ? filterUsers(item.recieveUserId).firstname +
                  " " +
                  filterUsers(item.recieveUserId).lastname
                : null}
            </td>
            <td> {item.data} </td>
            <td> {item.status} </td>
            <td title={item.createdAt}>
              <ReactTimeAgo date={new Date(item.createdAt)} />
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  const getTable = (data) => {
    return (
      <React.Fragment>
        <div
          style={{ overflow: "auto", fontSize: "11px" }}
          className="inverse-theme"
        >
          <table className="table table-responsive">
            <thead>
              <tr>
                <th> Id </th>
                <th> Title </th>
                <th> Message </th>
                <th> Actionist </th>
                <th> Reciever </th>
                <th> Data </th>
                <th> Status </th>
                <th> TimeStamp </th>
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
        name={"notificationLogs"}
        title={{ name: "Notification Logs", symbol: "logs" }}
      >
        {getTable(props.notificationLogs)}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  notificationLogs: state.notificationLogs,
  users: state.users,
  // natures: state.natures,
  // priorities: state.priorities,
  //   online: state.onlineResponders,
  //   offline: state.offlineResponders,
  //   unknown: state.unknownResponders,
  //   panics: state.panics,
  //   operators: state.operators,
  //   supervisors: state.supervisors,
  // inQueryPanics: state.inQueryPanics,
  // confirmedByOperatorPanics: state.confirmedByOperatorPanics,
  // assignedToResponderPanics: state.assignedToResponderPanics,
  // confirmedByResponderPanics: state.confirmedByResponderPanics,
  // resolvedByResponderPanics: state.resolvedByResponderPanics,
  // resolvedByOperatorPanics: state.resolvedByOperatorPanics,
  // closedBySupervisorPanics: state.closedBySupervisorPanics,
  // closedByCustomerPanics: state.closedByCustomerPanics,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationLogs);

import React, { useEffect, useState } from "react";
import Modal from "../../../../../containers/Modal/Modal";
import { connect } from "react-redux";
import {
  GetAllResponder,
  DelTraccarResponders,
} from "./../../../../../actions/index";
import Create from "./Create/Create";
import _ from "lodash";

const ResponderView = (props) => {
  const [page, setPage] = useState("main");

  const init = async () => {
    await props.getResponders();
  };

  useEffect(() => {
    init();
    return;
  }, []);

  const delResponder = async (id) => {
    await props.delResponder(id);
    await init();
  };

  const getTableData = (data) => {
    return data.map((item, index) => {
      let color = "transparent";
      if (item.status == "online") {
        color = "lightgreen";
      } else if (item.status == "offline") {
        color = "pink";
      } else if (item.status == "unknown") {
        color = "lightyellow";
      } else {
        color = "transparent";
      }
      if (item.db != null) {
        return (
          <React.Fragment key={index}>
            <tr style={{ background: color }}>
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
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => props.delTraccarResponders(item.id)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => props.delTraccarResponders(item.id)}
                >
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
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
        return (
          <React.Fragment key={index}>
            <tr style={{ background: "#eee" }}>
              <td> {item.id} </td>
              <td> ( {item.name} ) </td>
              <td> </td>
              <td> {item.contact} </td>
              <td> </td>
              <td> </td>
              <td></td>
              <td> </td>
              <td> </td>
              <td></td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>
                {/* <button
                  className="btn btn-primary"
                  onClick={() => delResponder(item.id)}
                >
                  <i className="fa fa-trash-o"></i>
                </button> */}
              </td>
              <td></td>
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
                <th> - </th>
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

  const groupser = () => {
    let data = [...props.online, ...props.offline, ...props.unknown];
    let data3 = props.groups.filter(
      (item) => item.groupId == props.user.groupId
    );
    let data4 = data3.map((item) => item.id);
    // console.error("Data: ", data4);
    let data2 = data.filter((item) => {
      try {
        if (item.db != null) {
          if (_.includes(data4, item.db.groupId)) {
            // console.error(
            //   item.db.groupId,
            //   _.includes(data4, item.db.groupId)
            // );
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    });
    return data2;
  };

  const getPage = () => {
    if (page == "main") {
      return <>{getTable(groupser())}</>;
    } else {
      return (
        <>
          <Create setPage={setPage} groupser={groupser()} />
        </>
      );
    }
  };

  return (
    <>
      <Modal
        close={false}
        big={true}
        name={"responderView"}
        title={{ name: "Responders", symbol: "car" }}
      >
        {page == "main" ? (
          <div>
            <button className="btn btn-primary" onClick={() => setPage("add")}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-primary" onClick={() => setPage("main")}>
              Back
            </button>
          </div>
        )}
        <br />
        {getPage()}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  // customers: state.customers,
  user: state.logger,
  groups: state.groups,
  online: state.onlineResponders,
  offline: state.offlineResponders,
  unknown: state.unknownResponders,
});

const mapDispatchToProps = (dispatch) => ({
  getResponders: () => GetAllResponder(dispatch),
  delTraccarResponders: (id) => DelTraccarResponders(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponderView);

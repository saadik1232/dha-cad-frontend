import React, { useState, useEffect } from "react";
import Panel from "../../../../containers/Panel/Panel";
import { getAllLocationsFromTraccar } from "./../../../../requests/Responders/Responders";
import { getAllPanics } from "./../../../../requests/Panic/Panic";
import _ from "lodash";
import { getNatures } from "./../../../../requests/Nature/Nature";
import { getPriorities } from "./../../../../requests/Priority/Priority";

export default function Window(props) {
  const heading = "Offline Responders";
  const heads = ["Name", "Status"];
  const heading3 = "Online Responders";
  const heads3 = ["Name", "Status"];
  const heading2 = "Panic Alerts";
  const heads2 = [
    "Contact",
    "Address",
    "Nature",
    "Priorities",
    "Operator",
    "Responder",
  ];
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [natures, setNatures] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    getAllLocationsFromTraccar(async (data) => {
      var db = [];
      await _.map(data, (r) => {
        if (r.db != null) {
          if (true) {
            var info = r.db;
            if (r.position != null) {
              info.lat = r.position.latitude;
              info.lng = r.position.longitude;
            }
            info.name = r.name;
            info.status = r.status;
            db.push(info);
          }
        }
      });
      var online = db.filter((ff) => ff.status == "online");
      console.error("Online: ", db);
      var unknown = db.filter((ff) => ff.status == "unknown");
      var offline = db.filter((ff) => ff.status == "offline");
      setData([...unknown, ...offline]);
      setData3([...online]);
    });
    getAllPanics((data) => {
      setData2(data);
    });
    getNatures((data) => {
      setNatures(data);
    });
    getPriorities((data) => {
      setPriorities(data);
    });
    return;
  }, []);

  const filterNature = (id) => {
    var n = natures.filter((n) => n.id == id);
    if (n.length > 0) return n[0];
    else return null;
  };

  const filterPriority = (id) => {
    var p = priorities.filter((p) => p.id == id);
    if (p.length > 0) return p[0];
    else return null;
  };
  const getHeads = (info) => {
    return info.map((d, index) => {
      return (
        <th key={index} style={{ lineHeight: "5px", fontSize: "10px" }}>
          {d}
        </th>
      );
    });
  };
  const check = (info) => {
    if (data) {
      return <td> {info || null} </td>;
    } else {
      return <td></td>;
    }
  };
  const getBody = () => {
    if (data.length > 0) {
      return data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <tr
              style={{
                lineHeight: "5px",
                fontSize: "10px",
                padding: "0px",
                margin: "0px",
              }}
            >
              {check(item.name)}
              {check(item.status)}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return null;
    }
  };

  const getBody3 = () => {
    if (data.length > 0) {
      return data3.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <tr
              style={{
                lineHeight: "5px",
                fontSize: "10px",
                padding: "0px",
                margin: "0px",
              }}
            >
              {check(item.name)}
              {check(item.status)}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return null;
    }
  };

  const getBody2 = () => {
    if (data2.length > 0) {
      return data2.map((item, index) => {
        var color = "white";
        if (item.statusId == 1) {
          color = "pink";
        } else if (item.statusId == 2) {
          color = "yellow";
        } else if (item.statusId == 3) {
          color = "lightblue";
        } else {
          color = "lightgreen";
        }
        return (
          <React.Fragment key={index}>
            <tr
              style={{
                lineHeight: "5px",
                fontSize: "10px",
                padding: "0px",
                margin: "0px",
                background: color,
              }}
            >
              {check(item.contact)}
              {check(item.address)}
              {check(filterNature(item.natureId).name)}
              {check(filterPriority(item.priorityId).name)}
              {check(item.operatorInvolved)}
              {check(item.responderInvolved)}
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <div>
      <div style={{ position: "absolute", top: 100, right: 10, zIndex: 10 }}>
        <Panel
          head={
            <div>
              <span className="pull-left">
                <i className="fa fa-tags"></i>&nbsp; {heading}
              </span>
              <span className="pull-right" style={{ marginLeft: "20px" }}>
                <i className="fa fa-remove"></i>
              </span>
              <span
                className="pull-right"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setShow(!show);
                }}
              >
                <i className="fa fa-file-o"></i>
              </span>
              <div className="clearfix"></div>
            </div>
          }
        >
          <div style={{ overflow: "auto", maxHeight: "150px" }}>
            {show ? (
              <table
                className="table table-responsive"
                style={{ lineHeight: "5px" }}
              >
                <thead
                  style={{ padding: "0px", margin: "0px", lineHeight: "5px" }}
                >
                  <tr>{getHeads(heads)}</tr>
                </thead>
                <tbody
                  style={{
                    lineHeight: "5px",
                  }}
                >
                  {getBody()}
                </tbody>
              </table>
            ) : null}
          </div>
        </Panel>

        <Panel
          head={
            <div>
              <span className="pull-left">
                <i className="fa fa-tags"></i>&nbsp; {heading3}
              </span>
              <span className="pull-right" style={{ marginLeft: "20px" }}>
                <i className="fa fa-remove"></i>
              </span>
              <span
                className="pull-right"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setShow3(!show3);
                }}
              >
                <i className="fa fa-file-o"></i>
              </span>
              <div className="clearfix"></div>
            </div>
          }
        >
          <div style={{ overflow: "auto", maxHeight: "150px" }}>
            {show3 ? (
              <table
                className="table table-responsive"
                style={{ lineHeight: "5px" }}
              >
                <thead
                  style={{ padding: "0px", margin: "0px", lineHeight: "5px" }}
                >
                  <tr>{getHeads(heads3)}</tr>
                </thead>
                <tbody
                  style={{
                    lineHeight: "5px",
                  }}
                >
                  {getBody3()}
                </tbody>
              </table>
            ) : null}
          </div>
        </Panel>

        <Panel
          head={
            <div>
              <span className="pull-left">
                <i className="fa fa-tags"></i>&nbsp; {heading2}
              </span>
              <span className="pull-right" style={{ marginLeft: "20px" }}>
                <i className="fa fa-remove"></i>
              </span>
              <span
                className="pull-right"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setShow2(!show2);
                }}
              >
                <i className="fa fa-file-o"></i>
              </span>
              <div className="clearfix"></div>
            </div>
          }
        >
          {show2 ? (
            <table
              className="table table-responsive"
              style={{ lineHeight: "5px" }}
            >
              <thead
                style={{ padding: "0px", margin: "0px", lineHeight: "5px" }}
              >
                <tr>{getHeads(heads2)}</tr>
              </thead>
              <tbody style={{ lineHeight: "5px" }}>{getBody2()}</tbody>
            </table>
          ) : null}
        </Panel>
      </div>
    </div>
  );
}

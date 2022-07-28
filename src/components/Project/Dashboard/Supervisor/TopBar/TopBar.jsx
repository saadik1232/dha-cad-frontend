import React from "react";
import { connect } from "react-redux";
import { UserLogout, changeZoom } from "../../../../../actions/index";
import TopMenu from "../../../../../containers/TobMenu/TopMenu";

const TopBar = (props) => {
  console.log("Supervisor Dashboard Panel - Top Menu");

  const setSiders = (data) => {
    if (data == "left") {
      let leftPin = localStorage.getItem("leftPin");
      if (leftPin) {
        let newLeft = leftPin == "false" ? true : false;
        // console.error("L:", newLeft);
        localStorage.setItem("leftPin", newLeft);
      } else {
        let newLeft = true;
        localStorage.setItem("leftPin", newLeft);
      }
    } else if (data == "right") {
      let rightPin = localStorage.getItem("rightPin");
      if (rightPin) {
        let newRight = rightPin == "false" ? true : false;
        localStorage.setItem("rightPin", newRight);
      } else {
        let newRight = true;
        localStorage.setItem("rightPin", newRight);
      }
    } else {
    }
    window.open("http://localhost:3001/", "_self");
  };

  return (
    <>
      <TopMenu title="Supervisor Panel">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a>
              <span data-toggle="modal" /* data-target="#logs" title="Logs" */>
                <i
                  className="fa fa-plus"
                  title="Zoom In"
                  onClick={() => props.changeZoom(props.zoomLevel + 1)}
                ></i>
                &nbsp;
                <i
                  className="fa fa-minus"
                  title="Zoom Out"
                  onClick={() => props.changeZoom(props.zoomLevel - 1)}
                ></i>
                &nbsp; Zoom &nbsp;
                <span className="badge inverse-theme"> {props.zoomLevel} </span>
              </span>
            </a>
          </li>
          <li>
            <a>
              <span data-toggle="modal" /* data-target="#logs" title="Logs" */>
                <i
                  className="fa fa-arrow-left"
                  title="Left Drawer"
                  onDoubleClick={() => setSiders("left")}
                  onClick={() => props.setLeft((item) => !item)}
                ></i>
                &nbsp;
                <i
                  className="fa fa-arrow-right"
                  title="Right Drawer"
                  onDoubleClick={() => setSiders("right")}
                  onClick={() => props.setRight((item) => !item)}
                ></i>
                &nbsp; Drawers
              </span>
            </a>
          </li>
          <li className="dropdown themer">
            <a
              href=""
              className="dropdown-toggle themer"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>
                <i className="fa fa-bar-chart"></i>
                <span> &nbsp; </span>
              </span>
              Reports &nbsp;
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li
                data-toggle="modal"
                data-target="#responderReports"
                className="themer"
              >
                <a>Reponder Reports</a>
              </li>
              <li
                data-toggle="modal"
                data-target="#operatorReports"
                className="themer"
              >
                <a>Operator Reports</a>
              </li>
              <li
                data-toggle="modal"
                data-target="#supervisorReports"
                className="themer"
              >
                <a>Supervisor Reports</a>
              </li>
              <li data-toggle="modal" data-target="#logs" className="themer">
                <a> Panic Logs </a>
              </li>
            </ul>
          </li>
          {/* 
          <li className="themer">
            <a>
              <span
                data-toggle="modal"
                data-target="#applications"
                title="Applications"
              >
                <i className="fa fa-file"></i> Applications
              </span>
            </a>
          </li> */}
          {/* 
          <li className="dropdown themer">
            <a
              href=""
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>
                <i className="fa fa-users"></i>
                <span> &nbsp; </span>
              </span>
              Users &nbsp;
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li
                data-toggle="modal"
                data-target="#supervisor"
                className="themer"
              >
                <a>Supervisors</a>
              </li>
              <li
                data-toggle="modal"
                data-target="#operator"
                className="themer"
              >
                <a>Operators</a>
              </li>
              <li
                data-toggle="modal"
                data-target="#customers"
                className="themer"
              >
                <a>Customers</a>
              </li>
              <li
                data-toggle="modal"
                data-target="#responderView"
                className="themer"
              >
                <a>Responders</a>
              </li>
            </ul>
          </li> */}

          <li className="dropdown themer">
            <a
              href=""
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>
                <i className="fa fa-user"></i>
                <span> &nbsp; </span>
              </span>
              {props.user.firstname.toUpperCase()} &nbsp;
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li data-toggle="modal" data-target="#profile">
                <a>Profile</a>
              </li>
              <li>
                <a onClick={props.logout}>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </TopMenu>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  zoomLevel: state.zoomLevel,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  changeZoom: (data) => changeZoom(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

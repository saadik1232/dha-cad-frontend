import React from "react";
import { connect } from "react-redux";
import { UserLogout, changeZoom } from "../../../../../actions/index";
import TopMenu from "../../../../../containers/TobMenu/TopMenu";

const TopBar = (props) => {
  console.log("Admin Panel Top Bar");
  return (
    <>
      <TopMenu title="Operator Panel">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a>
              <span data-toggle="modal" /* data-target="#logs" title="Logs" */>
                <i
                  className="fa fa-plus"
                  title="Zoom In"
                  onClick={() => props.changeZoom(props.zoomLevel - 1)}
                ></i>
                &nbsp;
                <i
                  className="fa fa-minus"
                  title="Zoom Out"
                  onClick={() => props.changeZoom(props.zoomLevel + 1)}
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
                  onClick={() => props.setLeft((item) => !item)}
                ></i>
                &nbsp;
                <i
                  className="fa fa-arrow-right"
                  title="Right Drawer"
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
          {/* <li>
            <a>
              <span data-toggle="modal" data-target="#logs" title="Logs">
                <i className="fa fa-list-alt"></i> Logs
              </span>
            </a>
          </li> */}
          <li className="themer">
            <a>
              <span
                data-toggle="modal"
                data-target="#priorities"
                title="Priorities"
              >
                <i className="fa fa-star"></i> Priorities
              </span>
            </a>
          </li>
          <li className="themer">
            <a>
              <span data-toggle="modal" data-target="#natures" title="Natures">
                <i className="fa fa-leaf"></i> Natures
              </span>
            </a>
          </li>
          <li className="themer">
            <a>
              <span
                data-toggle="modal"
                data-target="#services"
                title="Services"
              >
                <i className="fa fa-tags"></i> Services
              </span>
            </a>
          </li>
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
          </li>
          <li className="themer">
            <a>
              <span
                data-toggle="modal"
                data-target="#subscriptions"
                title="Subscriptions"
              >
                <i className="fa fa-tag"></i> Subscriptions
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
                <i className="fa fa-globe"></i>
                <span> &nbsp; </span>
              </span>
              Geofences &nbsp;
              <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li
                data-toggle="modal"
                data-target="#geofence"
                className="themer"
              >
                <a> Create New Geofence </a>
              </li>
              <li data-toggle="modal" data-target="#geoView" className="themer">
                <a> View Geofences </a>
              </li>
            </ul>
          </li>

          <li className="themer">
            <a>
              <span
                data-toggle="modal"
                data-target="#groups"
                title="Groups"
                className="themer"
              >
                <i className="fa fa-cubes"></i> Groups
              </span>
            </a>
          </li>

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
          </li>

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

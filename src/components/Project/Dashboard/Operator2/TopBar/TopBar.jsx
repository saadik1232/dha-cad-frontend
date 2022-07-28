import React from "react";
import { connect } from "react-redux";
import { UserLogout, changeZoom } from "../../../../../actions/index";
import TopMenu from "../../../../../containers/TobMenu/TopMenu";

const TopBar = (props) => {
  console.log("Supervisor Dashboard Panel - Top Menu");
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

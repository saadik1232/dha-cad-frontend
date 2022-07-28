import React from "react";
import { connect } from "react-redux";
import { UserLogout } from "./../../../../../actions/index";
import TopMenu from "../../../../../containers/TobMenu/TopMenu";

const TopBar = (props) => {
  console.log("Super Admin Panel Top Bar");
  return (
    <>
      <TopMenu title="Super Admin Panel">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a>
              <span data-toggle="modal" data-target="#groups">
                <i className="fa fa-cubes"></i>
              </span>
            </a>
          </li>
          <li>
            <a>
              <span data-toggle="modal" data-target="#admin">
                <i className="fa fa-users"></i>
              </span>
            </a>
          </li>
          <li className="dropdown">
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
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

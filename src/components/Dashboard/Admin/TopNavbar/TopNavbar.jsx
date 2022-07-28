import React from "react";
import { ToastsStore } from "react-toasts";

const TopNavbar = (props) => {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-default sharp-border"
        style={{ marginBottom: 0, zIndex: 3 }}
      >
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a
              className="navbar-brand"
              onClick={(e) => {
                // e.preventDefault();
                // if (props.mainFunc) props.mainFunc();
                window.open("/", "_self");
              }}
            >
              <b>
                <span>
                  <i className="fa fa-gears"></i>
                  &nbsp;
                </span>
                <span className="font">{props.title}</span>
              </b>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {/* <ul className="nav navbar-nav">{props.leftMenu()}</ul> */}
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={(e) => e.preventDefault()}>
                  <span data-toggle="modal" data-target="#geofence">
                    <i className="fa fa-map"></i>
                  </span>
                </a>
              </li>
              <li>
                <a onClick={(e) => e.preventDefault()}>
                  <span data-toggle="modal" data-target="#serviceApplied">
                    <i className="fa fa-file-o"></i>
                  </span>
                </a>
              </li>
              <li>
                <a onClick={(e) => e.preventDefault()}>
                  <span data-toggle="modal" data-target="#subscription">
                    <i className="fa fa-tag"></i>
                  </span>
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span data-toggle="modal" data-target="#services">
                    <i className="fa fa-envelope"></i>
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
                    <i className="fa fa-globe"></i>
                  </span>
                </a>
                <ul className="dropdown-menu">
                  <li
                    onClick={(e) => e.preventDefault()}
                    data-toggle="modal"
                    data-target="#city"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <span data-toggle="modal" data-target="#city">
                        City
                      </span>
                    </a>
                  </li>
                  <li
                    onClick={(e) => e.preventDefault()}
                    data-toggle="modal"
                    data-target="#town"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <span data-toggle="modal" data-target="#town">
                        Town
                      </span>
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a onClick={(e) => {}}>
                  <span>
                    <i className="fa fa-bell"></i>
                    <span
                      className="badge btn-danger"
                      style={{ position: "absolute", top: "5px", left: "25px" }}
                    >
                      9
                    </span>
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
                  {props.user.firstname
                    ? props.user.firstname.toUpperCase()
                    : "Account"}
                  &nbsp;
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li
                    onClick={(e) => e.preventDefault()}
                    data-toggle="modal"
                    data-target="#profile"
                  >
                    <a onClick={(e) => {}}>Profile</a>
                  </li>
                  <li>
                    <a
                      onClick={async () => {
                        await ToastsStore.warning("Logging Out");
                        props.logout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default TopNavbar;

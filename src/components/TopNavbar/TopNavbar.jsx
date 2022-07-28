import React from "react";

const TopNavbar = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-default sharp-border">
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
            {/* <ul className="nav navbar-nav navbar-right">{props.rightMenu()}</ul> */}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default TopNavbar;

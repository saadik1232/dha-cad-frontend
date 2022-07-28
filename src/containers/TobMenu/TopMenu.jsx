import React from "react";
import { connect } from "react-redux";
import { changeZoom } from "./../../actions/index";

const TopMenu = (props) => {
  return (
    <>
      <nav
        className="navbar navbar-default sharp-border theme"
        style={{ marginBottom: "-15px", zIndex: 10 }}
      >
        <div
          className="container-fluid"
          style={{ borderBottom: "1px solid #fff" }}
        >
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
            <a className="navbar-brand">
              <b>
                <span>
                  <i className="fa fa-gears"></i>&nbsp;
                </span>
                <span className="font"> {props.title} </span>
              </b>
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {props.children}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopMenu;

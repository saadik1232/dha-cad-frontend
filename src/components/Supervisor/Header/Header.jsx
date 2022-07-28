import React from "react";

const Header = props => {
  return (
    <React.Fragment>
      <header>
        <div id="topBar">
          <span>&nbsp;&nbsp;</span>
          <b> C.A.D. ( Supervisor Dashboard ) </b>
          <span className="pullRight">
            <span>&nbsp;&nbsp;</span>
            <i
              className="fa fa-eye"
              onClick={() => props.setEventHide(!props.eventHide)}
            ></i>
            <span>&nbsp;&nbsp;</span>
            <i className="fa fa-clock-o"></i>
            <span>&nbsp;&nbsp;</span>
            <i
              className="fa fa-bell"
              style={{ color: props.notice ? "darkblue" : "white" }}
            ></i>
            <span>&nbsp;&nbsp;</span>
            <i
              className="fa fa-user"
              onClick={() => {
                props.setDisplaysHide(true);
                props.setDisplaysHide2(!props.displaysHide2);
              }}
            ></i>
            <span>&nbsp;&nbsp;</span>
            <i
              className="fa fa-cog"
              onClick={() => {
                props.setDisplaysHide2(true);
                props.setDisplaysHide(!props.displaysHide);
              }}
            ></i>
            <span>&nbsp;&nbsp;</span>
            <i className="fa fa-power-off" onClick={() => props.logout()}></i>
            <span>&nbsp;&nbsp;</span>
          </span>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

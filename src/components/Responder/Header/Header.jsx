import React from "react";

const Header = props => {
  return (
    <React.Fragment>
      <header>
        <div id="topBar">
          <span>&nbsp;&nbsp;</span>
          <b> C.A.D. ( Responder Dashboard ) </b>
          <span className="pullRight">
            <span>&nbsp;&nbsp;</span>
            <i className="fa fa-cog"></i>
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

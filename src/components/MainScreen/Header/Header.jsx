import React from "react";

const Header = props => {
  return (
    <React.Fragment>
      <header>
        <div id="topBar">
          <span>&nbsp;&nbsp;</span>
          <b> C.A.D. ( Main Screen View ) </b>

          <span>&nbsp;&nbsp;</span>
          <span className="pull-right">&nbsp;&nbsp;</span>

          <i
            className="fa fa-power-off pull-right"
            style={{ padding: "5px" }}
            onClick={() => props.logout()}
          ></i>
          <span className="pull-right">&nbsp;&nbsp;</span>
          <span>&nbsp;&nbsp;</span>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

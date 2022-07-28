import React from "react";

const Icon = (props) => {
  var icon = "fa fa-" + props.name;
  return (
    <React.Fragment>
      <span>
        <i className={icon}></i> &nbsp;
      </span>
    </React.Fragment>
  );
};

export default Icon;

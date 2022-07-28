import React from "react";

const Panel = (props) => {
  return (
    <>
      <div className="panel panel-primary">
        {props.head == null ? null : (
          <div className="panel-heading">{props.head}</div>
        )}

        {props.children ? (
          <div className="panel-body">{props.children}</div>
        ) : null}

        {props.foot == null ? null : (
          <div className="panel-footer">{props.foot}</div>
        )}
      </div>
    </>
  );
};

export default Panel;

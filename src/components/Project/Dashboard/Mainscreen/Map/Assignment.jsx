import React, { useState } from "react";

export default function Assignment(props) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="form group">
        <select
          className="btn-xs form-control"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="0"> -- Assign Responder -- </option>
          {props.displayAssignmentSelector()}
        </select>
      </div>
      <br />
      <button
        className="btn btn-primary btn-xs btn-block"
        onClick={(e) => {
          e.preventDefault();
          if (selected != 0) {
            props.assignPanicAlert(props.item.id, selected); // Ali Ahmad ( Responder )
          }
        }}
      >
        <span>
          <i className="fa fa-check"></i>
          &nbsp;
        </span>
        Assign
      </button>
    </div>
  );
}

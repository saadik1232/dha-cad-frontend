import React, { useState } from "react";
import { UpdateUser } from "./../../../../../requests/User/User";
import { ToastsStore } from "react-toasts";

const Single = (props) => {
  const [toggle, setToggle] = useState(false);

  const approve = (i) => {
    UpdateUser({ userId: props.item.id, approval: !props.check }, () => {
      ToastsStore.warning(
        props.item.id,
        " has been Successfully Approved / Dis Approved"
      );
    });
  };

  const fetchApplierContent = () => {
    return (
      <tr>
        <td>{props.item.id}</td>
        <td>{props.item.firstname}</td>
        <td>{props.item.lastname}</td>
        <td>{props.item.contact}</td>
        <td>{props.item.cnic}</td>
        <td>
          <label class="switch">
            <input
              type="checkbox"
              checked={props.check}
              onClick={() => approve(props.item.id)}
            />
            <span class="slider round"></span>
          </label>
        </td>
      </tr>
    );
  };

  return <React.Fragment>{fetchApplierContent()}</React.Fragment>;
};

export default Single;

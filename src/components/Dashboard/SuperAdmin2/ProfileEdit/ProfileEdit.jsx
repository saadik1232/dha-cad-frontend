import React, { useState } from "react";
import { UpdateUser } from "./../../../../requests/User/User";
import { ToastsStore } from "react-toasts";

const ProfileEdit = (props) => {
  var user = props.user;

  const [first, setFirst] = useState(user.firstname || "");
  const [last, setLast] = useState(user.lastname || "");
  const [contact, setContact] = useState(user.contact || "");
  const [cnic, setCnic] = useState(user.cnic || "");
  const [email, setEmail] = useState(user.email || "");
  const [image, setImage] = useState(user.image || "");

  const update = async () => {
    if (
      first != "" &&
      last != "" &&
      contact != "" &&
      cnic != "" &&
      email != ""
    ) {
      UpdateUser(
        {
          ...user,
          firstname: first,
          lastname: last,
          image: image,
          email,
          cnic,
          contact,
          userId: user.id,
        },
        () => {
          props.localRefresh();
          ToastsStore.success("Profile Updated Successfully !");
        }
      );
    } else {
      ToastsStore.warning("Please Fill In Complete Info !");
    }
  };

  return (
    <React.Fragment>
      <div className="form-group">
        <input
          type="file"
          placeholder=" Snap "
          className="form-control"
          onChange={(e) => {
            let reader = new FileReader();
            reader.onload = (ev) => {
              // this.setState({ image: e.target.result });
              setImage(ev.target.result);
              console.error(ev.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            // console.error(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder=" First Name "
          className="form-control"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder=" Last Name "
          className="form-control"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder=" Contact "
          className="form-control"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder=" Email "
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder=" Cnic "
          className="form-control"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
        />
      </div>
      <div>
        <button
          className="btn btn-primary pull-right"
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#profile"
          onClick={update}
        >
          <span>
            <i className="fa fa-pencil"></i>
            &nbsp;
          </span>
          Update
        </button>
        <div className="clearfix"></div>
      </div>
    </React.Fragment>
  );
};

export default ProfileEdit;

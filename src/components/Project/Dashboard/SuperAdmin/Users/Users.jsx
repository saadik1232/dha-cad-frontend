import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../../../../containers/Modal/Modal";
import List from "./List/List";
import { GetUsers, UserLogout } from "../../../../../actions/index";
import Create from "./Create/Create";

const Users = (props) => {
  console.log("Super Admin Users Component");

  const [page, setPage] = useState("main");
  const [id, setId] = useState("");

  useEffect(() => {
    props.getUsers();
    return;
  }, []);

  const selectButton = () => {
    if (page == "main") {
      return (
        <button className="btn btn-primary" onClick={() => setPage("add")}>
          Create
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            setId("");
            setPage("main");
          }}
        >
          Back
        </button>
      );
    }
  };

  const selectSection = () => {
    if (page == "main") {
      return <List setPage={setPage} setId={setId} />;
    } else {
      return <Create setPage={setPage} id={id} setId={setId} />;
    }
  };

  return (
    <>
      <Modal
        close={false}
        big={true}
        name={"admin"}
        title={{ name: "Super Admin", symbol: "users" }}
      >
        <div>{selectButton()}</div>
        <br />
        <div>{selectSection()}</div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  // groups: state.groups,
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getUsers: () => GetUsers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);

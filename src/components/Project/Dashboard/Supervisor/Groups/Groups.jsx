import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../../../../containers/Modal/Modal";
import List from "./List/List";
import { GetTraccarGroups, UserLogout } from "../../../../../actions/index";
import Create from "./Create/Create";

const Groups = (props) => {
  console.log("Supervisor - Groups");

  const [page, setPage] = useState("main");
  const [id, setId] = useState("");

  useEffect(() => {
    // props.getTraccarGroups();
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
      return <List groups={props.groups} setPage={setPage} setId={setId} />;
    } else {
      return <Create setPage={setPage} id={id} setId={setId} />;
    }
  };

  return (
    <>
      <Modal
        close={false}
        big={false}
        name={"groups"}
        title={{ name: "Groups", symbol: "cubes" }}
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
  groups: state.groups, // .filter((item) => item.id == state.logger.groupId),
});

const mapDispatchToProps = (dispatch) => ({
  // logout: () => UserLogout(dispatch),
  getTraccarGroups: () => GetTraccarGroups(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

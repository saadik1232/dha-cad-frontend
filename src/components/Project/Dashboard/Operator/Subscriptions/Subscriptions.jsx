import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../../../../containers/Modal/Modal";
import List from "./List/List";
import { GetSubscriptions, UserLogout } from "../../../../../actions/index";
import Create from "./Create/Create";

const Subscriptions = (props) => {
  console.log("Super Admin Users Component");

  const [page, setPage] = useState("main");
  const [id, setId] = useState("");

  useEffect(() => {
    props.getSubscriptions();
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
        <button className="btn btn-primary" onClick={() => setPage("main")}>
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
        name={"subscriptions"}
        title={{ name: "Subscriptions", symbol: "tag" }}
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
  subscriptions: state.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getSubscriptions: () => GetSubscriptions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);

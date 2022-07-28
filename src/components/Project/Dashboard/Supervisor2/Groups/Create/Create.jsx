import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GetTraccarGroups,
  CreateTraccarGroups,
  UpdateTraccarGroups,
  UserLogout,
} from "../../../../../../actions/index";

const Create = (props) => {
  console.log("Supervisor - Group Create");

  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState(props.user.groupId + "" || "");

  useEffect(() => {
    let data = props.groups.filter((item) => item.id == props.id);
    data = data[0] || null;
    if (data != null) {
      setName(data.name);
      setGroupId(data.groupId == 0 ? "" : data.groupId);
    }
    return;
  }, []);

  const getGroups = () => {
    return props.groups.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <option value={item.id}> {item.name} </option>
        </React.Fragment>
      );
    });
  };

  const Empty = () => {
    if (props.id != "") {
      props.setId("");
    }
    setName("");
    setGroupId("");
  };

  const save = async () => {
    // console.error({ id: props.id, name, groupId });
    if (props.id != "") {
      await props.updateTraccarGroups(props.id, { name, groupId });
    } else {
      await props.createTraccarGroups({ name, groupId });
    }
    setTimeout(() => {
      props.getTraccarGroups();
      Empty();
      props.setPage("main");
    }, 500);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder=" Enter Name "
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <select
          className="form-control"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          disabled
        >
          <option value=""> None </option>
          {getGroups()}
        </select>
        <br />
        <div>
          <button className="btn btn-primary pull-right" onClick={save}>
            Save
          </button>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  groups: state.groups, // .filter((item) => item.groupId == state.logger.groupId),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getTraccarGroups: () => GetTraccarGroups(dispatch),
  createTraccarGroups: (data) => CreateTraccarGroups(dispatch, data),
  updateTraccarGroups: (id, data) => UpdateTraccarGroups(dispatch, id, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

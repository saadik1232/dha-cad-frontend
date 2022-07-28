import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GetNatures,
  CreateNatures,
  UpdateNatures,
  UserLogout,
  GetTraccarGroups,
} from "../../../../../../actions/index";

const Create = (props) => {
  console.log("Super Admin Groups Create");

  const [name, setName] = useState("");
  // const [groupId, setGroupId] = useState("");

  const init = async () => {
    // await props.getTraccarGroups();
  };

  useEffect(() => {
    init();
    let data = props.natures.filter((item) => item.id == props.id);
    data = data[0] || null;
    if (data != null) {
      setName(data.name);
      // setGroupId(data.groupId);
    }
    return;
  }, []);

  // const getGroups = () => {
  //   return props.groups.map((item, index) => {
  //     return (
  //       <React.Fragment key={index}>
  //         <option value={item.id}> {item.name} </option>
  //       </React.Fragment>
  //     );
  //   });
  // };

  const Empty = () => {
    if (props.id != "") {
      props.setId("");
    }
    setName("");

    // setGroupId("");
  };

  const save = async () => {
    if (props.id != "") {
      await props.UpdateNatures(props.id, {
        name,
        // userId: 1, // Number(groupId) == 0 ? 1 : Number(groupId),
      });
    } else {
      await props.CreateNatures({
        name,
        // userId: 1, // Number(groupId) == 0 ? 1 : Number(groupId),
      });
    }
    setTimeout(() => {
      props.getNatures();
      Empty();
      props.setPage("main");
    }, 500);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder=" Enter First Name "
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        {/* <select
          className="form-control"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value=""> None </option>
          {getGroups()}
        </select>
        <br /> */}
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
  groups: state.groups,
  // admin: state.admin,
  natures: state.natures,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => UserLogout(dispatch),
  getNatures: () => GetNatures(dispatch),
  // getTraccarGroups: () => GetTraccarGroups(dispatch),
  CreateNatures: (data) => CreateNatures(dispatch, data),
  UpdateNatures: (id, data) => UpdateNatures(dispatch, id, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

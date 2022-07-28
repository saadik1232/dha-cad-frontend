import React, { useState, useEffect } from "react";
import Modal from "../../containers/Modal/Modal";
import _ from "lodash";

const Crud = (props) => {
  console.log("Crud Component for " + (props.name || "Anonymous"));

  const [section, setSection] = useState("main");
  const [page, setPage] = useState(1);
  const [buttons, setButtons] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 5;

  useEffect(() => {
    const a = props.data.length / limit;
    const b = props.data.length % limit;
    const num = Math.round(a + b);
    setButtons(num);
    return;
  }, [props.data]);

  const getHeads = () => {
    return props.heads.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <th> {item} </th>
        </React.Fragment>
      );
    });
  };

  const TableLayout = () => {
    if (props.heads) {
      return (
        <>
          <table className="table table-responsive table-hover">
            <thead>
              <tr>{getHeads()}</tr>
            </thead>
            <tbody>{getTableData()}</tbody>
          </table>
        </>
      );
    } else {
      return null;
    }
  };

  const getCell = (data, item) => {
    if (typeof item == "object" && item.html) {
      return <td> {item.html} </td>;
    } else if (item != "") {
      return <td> {data[item]} </td>;
    } else {
      return <td></td>;
    }
  };

  const getAttr = (data) => {
    return props.attr.map((item, index) => {
      //   console.log(data[item]);
      return <React.Fragment key={index}>{getCell(data, item)}</React.Fragment>;
    });
  };

  const getTableData = () => {
    if (props.attr && props.data) {
      let data = props.data;
      // Page Limit Filter
      let end = page * limit;
      let start = end - limit;
      data = _.slice(data, start, end);
      // Search Filter
      return data.map((item, index) => {
        let info = Object.keys(item);
        let flag = false;
        _.map(info, (key) => {
          if (typeof item[key] == "string" || typeof item[key] == "integer") {
            if (item[key] == search || item[key].includes(search)) {
              flag = flag || true;
            } else {
              flag = flag || false;
            }
          } else {
            flag = flag || false;
          }
        });
        if (flag)
          return (
            <React.Fragment key={index}>
              <tr>{getAttr(item)}</tr>
            </React.Fragment>
          );
      });
    } else {
      return null;
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage((item) => item - 1);
    }
  };

  const next = () => {
    if (page >= buttons) {
    } else {
      setPage((item) => item + 1);
    }
  };

  const getPagination = () => {
    return (
      <>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={prev}>
            <i className="fa fa-arrow-left"></i>
          </button>
          <button className="btn btn-primary">{page}</button>
          <button className="btn btn-primary" onClick={next}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </>
    );
  };

  const getMainPage = () => {
    return (
      <>
        {props.add && (
          <button className="btn btn-primary" onClick={() => setSection("add")}>
            Create New
          </button>
        )}
        {props.search && (
          <>
            <input
              style={{ width: "200px" }}
              className="form-control pull-right"
              placeholder="Search here ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="clearfix"></div>
          </>
        )}
        <br />
        <br />
        {TableLayout()}
        {getPagination()}
      </>
    );
  };

  const getCreateForm = () => {
    return (
      <>
        <div>
          {getFormInputs()}
          <br />
          <button className="btn btn-primary pull-left"> Save </button>
          <button
            className="btn btn-primary pull-right"
            onClick={() => setSection("main")}
          >
            Back
          </button>
          <div className="clearfix"></div>
        </div>
      </>
    );
  };

  const getFormInputs = () => {
    return props.form.map((item) => {
      return (
        <React.Fragment>
          <div className="">
            <label>{item}</label>
            <input type="text" className="form-control" />
          </div>
        </React.Fragment>
      );
    });
  };

  const getSection = () => {
    if (section == "main") {
      return getMainPage();
    } else if (section == "add") {
      return (
        <>
          {props.children}
          <button
            className="btn btn-primary pull-right"
            onClick={() => setSection("main")}
          >
            Back
          </button>
          <div className="clearfix"></div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Modal
        close={props.close || false}
        big={props.big || false}
        name={props.name || "groups"}
        title={props.title || { name: "Groups", symbol: "cubes" }}
      >
        {getSection()}
      </Modal>
    </>
  );
};

export default Crud;

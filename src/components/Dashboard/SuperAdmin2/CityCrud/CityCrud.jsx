import React, { useState, useEffect } from "react";
import {
  getCities,
  addCity,
  delCity,
  updateCity,
} from "../../../../requests/City/City";
import { ToastsStore } from "react-toasts";
import { Beep1 } from "../../../../Beeper/Beeper";

const CityCrud = (props) => {
  const [city, setCity] = useState([]);
  const [page, setPage] = useState("view");
  const [form, setForm] = useState("add");

  /**
   * Attributes
   */
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const toggle = () => {
    if (page == "view") {
      setPage("add");
    } else {
      setPage("view");
    }
    setId(0);
    setName("");
    setForm("add");
  };

  const fetchCity = () => {
    return city.map((s) => {
      return (
        <React.Fragment key={s.id}>
          <tr>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  toggle();
                  setId(s.id);
                  setName(s.name);
                  setForm("edit");
                }}
              >
                <i className="fa fa-pencil"></i>
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  delCity(s.id, () => {
                    ToastsStore.success("City Deleted Successfully !");
                  });
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    setInterval(() => {
      getCities((data) => {
        setCity(data);
      });
    }, 1000);
  }, []);

  const save = () => {
    if (name == "") {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        // userId: props.user.id,
      };
      addCity(data, () => {
        toggle();
        Beep1();
        ToastsStore.success("City has been Added Successfully !");
      });
    }
  };

  const edit = () => {
    if (name == "") {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        // userId: props.user.id,
      };
      updateCity(id, data, () => {
        toggle();
        Beep1();
        ToastsStore.success("City has been Updated Successfully !");
      });
    }
  };

  const getView = () => {
    return (
      <React.Fragment>
        <div>
          <button className="btn btn-primary" onClick={toggle}>
            <i className="fa fa-plus"></i> Add New City
          </button>
          <br />
          <br />
          <div className="well">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>

                  <th> - </th>
                  <th> - </th>
                </tr>
              </thead>
              <tbody>{fetchCity()}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const getAdd = () => {
    return (
      <React.Fragment>
        <div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary pull-left" onClick={toggle}>
              Back to View
            </button>
            {form == "add" ? (
              <button className="btn btn-primary pull-right" onClick={save}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary pull-right" onClick={edit}>
                Update
              </button>
            )}
            <div className="clearfix"></div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>{page == "view" ? getView() : getAdd()}</React.Fragment>
  );
};

export default CityCrud;

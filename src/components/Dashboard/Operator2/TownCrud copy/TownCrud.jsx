import React, { useState, useEffect } from "react";
import {
  getTowns,
  addTown,
  delTown,
  updateTown,
} from "../../../../requests/Town/Town";
import { getCities, getFilteredCity } from "../../../../requests/City/City";
import { ToastsStore } from "react-toasts";
import { Beep1 } from "../../../../Beeper/Beeper";

const TownCrud = (props) => {
  const [town, setTown] = useState([]);
  const [page, setPage] = useState("view");
  const [form, setForm] = useState("add");
  const [cities, setCities] = useState([]);

  /**
   * Attributes
   */
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getCities((data) => {
      setCities(data);
    });
  }, []);

  const displayCities = () => {
    return cities.map((c) => {
      return (
        <option key={c.id} value={c.id}>
          {c.name ? c.name.toUpperCase() : ""}
        </option>
      );
    });
  };

  const filterCity = (id) => {
    var data = cities.filter((c) => c.id == id);
    if (data.length > 0) return data[0];
    else return null;
  };

  const toggle = () => {
    if (page == "view") {
      setPage("add");
    } else {
      setPage("view");
    }
    setId(0);
    setName("");
    setCityId(0);
    setForm("add");
  };

  const fetchTown = () => {
    return town.map((s) => {
      var city = filterCity(s.cityId);
      return (
        <React.Fragment key={s.id}>
          <tr>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{city == null ? "" : city.name}</td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  toggle();
                  setId(s.id);
                  setName(s.name);
                  setCityId(s.cityId);
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
                  delTown(s.id, () => {
                    ToastsStore.success("Town Deleted Successfully !");
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
      getTowns((data) => {
        setTown(data);
      });
    }, 1000);
  }, []);

  const save = () => {
    if (name == "" && cityId != 0 && cityId == "0") {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        cityId,
        // userId: props.user.id,
      };
      addTown(data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Town has been Added Successfully !");
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
        cityId,
        // userId: props.user.id,
      };
      updateTown(id, data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Town has been Updated Successfully !");
      });
    }
  };

  const getView = () => {
    return (
      <React.Fragment>
        <div>
          <button className="btn btn-primary" onClick={toggle}>
            <i className="fa fa-plus"></i> Add New Town
          </button>
          <br />
          <br />
          <div className="well">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>City</th>

                  <th> - </th>
                  <th> - </th>
                </tr>
              </thead>
              <tbody>{fetchTown()}</tbody>
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
          <div className="form-group">
            <select
              className="form-control"
              value={cityId}
              onChange={(e) => {
                setCityId(Number(e.target.value));
                getFilteredCity(Number(e.target.value), (data) => {
                  console.log(data);
                  setSelected(data);
                });
              }}
            >
              {displayCities()}
            </select>
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

export default TownCrud;

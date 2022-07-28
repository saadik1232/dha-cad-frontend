import React, { useState, useEffect } from "react";
import {
  getServices,
  delService,
  addService,
  editService,
} from "../../../../requests/Service/Service";
import { ToastsStore } from "react-toasts";
import { Beep1 } from "../../../../Beeper/Beeper";

const ServicesCrud = (props) => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState("view");
  const [form, setForm] = useState("add");

  /**
   * Attributes
   */
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("");

  const toggle = () => {
    if (page == "view") {
      setPage("add");
    } else {
      setPage("view");
    }
    setId(0);
    setName("");
    setLat("");
    setLng("");
    setRadius("");
    setForm("add");
  };

  const fetchServices = () => {
    return services.map((s) => {
      return (
        <React.Fragment key={s.id}>
          <tr>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.lat}</td>
            <td>{s.lng}</td>
            <td>{s.radius}</td>
            <td>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  toggle();
                  setId(s.id);
                  setName(s.name);
                  setLat(s.lat);
                  setLng(s.lng);
                  setRadius(s.radius);
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
                  delService(s.id, () => {
                    ToastsStore.success("Service Deleted Successfully !");
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
      getServices((data) => {
        setServices(data);
      });
    }, 1000);
  }, []);

  const save = () => {
    if (
      name == "" ||
      lat == "" ||
      lat == 0 ||
      lng == "" ||
      lng == 0 ||
      radius == "" ||
      radius == 0
    ) {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        lat,
        lng,
        radius,
        userId: props.user.id,
      };
      addService(data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Service has been Added Successfully !");
      });
    }
  };

  const edit = () => {
    if (
      name == "" ||
      lat == "" ||
      lat == 0 ||
      lng == "" ||
      lng == 0 ||
      radius == "" ||
      radius == 0
    ) {
      Beep1();
      ToastsStore.error("Please Enter Complete Information !");
    } else {
      var data = {
        name,
        lat,
        lng,
        radius,
        userId: props.user.id,
      };
      editService(id, data, () => {
        toggle();
        Beep1();
        ToastsStore.success("Service has been Updated Successfully !");
      });
    }
  };

  const getView = () => {
    return (
      <React.Fragment>
        <div>
          <button className="btn btn-primary" onClick={toggle}>
            <i className="fa fa-plus"></i> Add New Service
          </button>
          <br />
          <br />
          <div className="well">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Radius</th>

                  <th> - </th>
                  <th> - </th>
                </tr>
              </thead>
              <tbody>{fetchServices()}</tbody>
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
              <input
                type="number"
                placeholder="Latitude"
                className="form-control"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Longitude"
                className="form-control"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Radius"
                className="form-control"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </div>
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

export default ServicesCrud;

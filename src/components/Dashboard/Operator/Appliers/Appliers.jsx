import React, { useState, useEffect } from "react";
import { getServiceAppliers } from "../../../../requests/Service/Service";
import Single from "./Single/Single";

const Appliers = (props) => {
  const [appliers, setAppliers] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getServiceAppliers((data) => {
        setAppliers(data);
      });
    }, 1000);
  }, []);

  const fetchApplierContent = () => {
    return appliers.map((a) => {
      console.log("A: ", a.approval);
      var check =
        typeof a.approval != "undefined" &&
        a.approval != null &&
        a.approval != 0 &&
        a.approval != false;
      return <Single key={a.id} item={a} check={check} />;
    });
  };

  const fetchApplierTable = () => {
    return (
      <React.Fragment>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Contact</th>
              <th>Cnic</th>
              <th> - </th>
            </tr>
          </thead>
          <tbody>{fetchApplierContent()}</tbody>
        </table>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="well">{fetchApplierTable()}</div>
    </React.Fragment>
  );
};

export default Appliers;

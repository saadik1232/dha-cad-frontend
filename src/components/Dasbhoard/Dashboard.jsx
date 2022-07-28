import React from "react";
import Customer from "../Customer/Customer";
import Admin from "../Admin/Admin";
import Supervisor from "../Supervisor/Supervisor";
import Operator from "../Operator/Operator";
import Responder from "../Responder/Responder";
import CustomerFamily from "../CustomerFamily/CustomerFamily";
import MainScreen from "../MainScreen/MainScreen";
import { Redirect } from "react-router-dom";

const Dashboard = props => {
  var natures = [
    {
      id: 1,
      name: "TBD"
    },
    {
      id: 2,
      name: "Robbery"
    },
    {
      id: 3,
      name: "Medical"
    }
  ];
  var priorities = [
    {
      id: 1,
      name: "Normal"
    },
    {
      id: 2,
      name: "Medium"
    },
    {
      id: 3,
      name: "High"
    }
  ];

  var statuses = [
    {
      id: 1,
      name: "In Query"
    },
    {
      id: 2,
      name: "Pending"
    },
    {
      id: 3,
      name: "Assigned"
    },
    {
      id: 4,
      name: "Resolved"
    }
  ];

  const logout = () => {
    props.logout();
    props.setRed(true);
  };
  const getExactUser = () => {
    var role = props.verify().roleId;

    switch (role) {
      case 1:
        return <Admin verify={props.verify} logout={() => logout()} />;
      case 2:
        // return (
        //   <Supervisor
        //     natures={natures}
        //     priorities={priorities}
        //     statuses={statuses}
        //     verify={props.verify}
        //     logout={() => logout()}
        //   />
        // );
        return "Hello world !";
      case 3:
        // console.log("Verified: ", props.verify());
        if (props.verify().isSupervisor == 1) {
          return (
            <Supervisor
              natures={natures}
              priorities={priorities}
              statuses={statuses}
              verify={props.verify}
              logout={() => logout()}
            />
          );
        } else {
          return (
            <Operator
              natures={natures}
              priorities={priorities}
              statuses={statuses}
              verify={props.verify}
              logout={() => logout()}
            />
          );
        }
      case 4:
        return <Responder verify={props.verify} logout={() => logout()} />;
      case 5:
        return <Customer verify={props.verify} logout={() => logout()} />;
      case 6:
        return <CustomerFamily verify={props.verify} logout={() => logout()} />;
      case 7:
        return (
          <MainScreen
            natures={natures}
            priorities={priorities}
            statuses={statuses}
            verify={props.verify}
            logout={() => logout()}
          />
        );
      default:
        return <Customer verify={props.verify} logout={() => logout()} />;
    }
  };
  return <React.Fragment>{getExactUser()}</React.Fragment>;
};

export default Dashboard;

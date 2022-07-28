import React, { useState } from "react";
import Panel from "../../containers/Panel/Panel";
import PageCenter from "../../containers/PageCenter/PageCenter";
import LoginForm from "./LoginForm/LoginForm";
import SignIn from "./SignIn/Signin";

const Login = (props) => {
  return (
    <React.Fragment>
      <PageCenter>
        <Panel
          head={
            <b>
              <SignIn />
              <span>Sign In</span>
            </b>
          }
        >
          <LoginForm
            setAuth={props.setAuth}
            user={props.user}
            setUser={props.setUser}
          />
        </Panel>
      </PageCenter>
    </React.Fragment>
  );
};

export default Login;

import React from "react";
import {
  SipProvider,
  SIP_STATUS_DISCONNECTED,
  //SIP_STATUS_...,
  CALL_STATUS_IDLE,
  //CALL_STATUS_...,
  SIP_ERROR_TYPE_CONFIGURATION,
  //SIP_ERROR_TYPE_...,
  CALL_DIRECTION_INCOMING,
  CALL_DIRECTION_OUTGOING,
} from "react-sip";

const Chatbox = (props) => {
  return (
    <>
      <SipProvider
        // host="ss.dextrologix.com"
        host="wss://ss.dextrologix.com"
        port={8089}
        pathname="/ws" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
        user="6001@ss.dextrologix.com"
        password={"60011234"} // usually required (e.g. from ENV or props)
        autoRegister={true} // true by default, see jssip.UA option register
        autoAnswer={false} // automatically answer incoming calls; false by default
        iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
        sessionTimersExpires={120} // value for Session-Expires header; 120 by default
        extraHeaders={
          {
            // optional sip headers to send
            //   register: ["X-Foo: foo", "X-Bar: bar"],
            //   invite: ["X-Foo: foo2", "X-Bar: bar2"],
          }
        }
        iceServers={
          [
            // optional
            //   { urls: ["stun:a.example.com", "stun:b.example.com"] },
            //   { urls: "turn:example.com", username: "foo", credential: "1234" },
          ]
        }
        debug={false} // whether to output events to console; false by default
      ></SipProvider>
    </>
  );
};

export default Chatbox;

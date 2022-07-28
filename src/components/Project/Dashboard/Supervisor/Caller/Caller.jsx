import React, { useEffect, useState } from "react";
// import { sipPropType } from "react-sip";
import JsSIP from "jssip";

const Caller = () => {
  // Create our JsSIP instance and run it:

  const [text, setText] = useState(""); // saving msg
  const [num, setNum] = useState(""); // number to send msg on
  const [newCall, setNewCall] = useState(false); //
  const [showChat, setShowChat] = useState(false); // Display Chat box
  const [acceptCall, setAcceptCall] = useState(false); // Weather to accept call or not
  const [msg, setMsg] = useState([]); //

  const DisplayMsg = () => {
    if (msg.length > 0) {
      return msg.map((m) => <p> {m} </p>);
    } else {
      return null;
    }
  };

  const _acceptCall = (session) => {
    //
    setAcceptCall(true);
  };

  const _handleSms = (body) => {
    setMsg((msg) => [...msg, body]);
    if (!showChat) {
      setShowChat(true);
    }
  };

  const _hideChat = () => {
    if (showChat) {
      setShowChat(false);
    }
  };

  useEffect(() => {
    // console.log("callled");
  }, [msg]);

  var socket = new JsSIP.WebSocketInterface("wss://ss.dextrologix.com:8089/ws");
  var configuration = {
    sockets: socket,
    uri: "6001@ss.dextrologix.com",
    password: "60011234",
    use_preloaded_route: true,
  };
  var remoteAudio = new window.Audio();
  remoteAudio.autoplay = true;

  const mediaSource = new MediaSource();

  var selfView = document.getElementById("selfView");
  var remoteView = document.getElementById("remoteView");

  var ua = new JsSIP.UA(configuration);

  ua.on("connected", function (e) {
    // console.log("Socket Connected.");
  });

  ua.on("disconnected", function (e) {
    console.log("Socket Closed. ");
  });

  ua.on("registered", function (e) {
    // console.log("Registered.");
  });
  ua.on("unregistered", function (e) {
    // console.log("Unregistered.");
  });
  ua.on("registrationFailed", function (e) {
    // console.log("Registeration Failed");
  });

  ua.on("newMessage", function (e) {
    console.log("new Message", e);
    if (typeof e.request.body === "string") {
      if (e.originator === "remote") {
        _handleSms(e.request.body);
        // setMsg([...msg, e.request.body]);
        // if (!showChat) {
        //   setShowChat(true);
        // }
      } else if (e.originator === "local") {
        // local msg
      }
    }
  });

  var session;

  ua.on("newRTCSession", function (ev) {
    var newSession = ev.session;

    if (session) {
      // hangup any existing call
      session.terminate();
    }
    session = newSession;
    var completeSession = function () {
      console.log("session trunacated");
      session = null;
      setNewCall(false);
      setAcceptCall(false);
    };

    if (session.direction === "outgoing") {
      console.log("stream outgoing  -------->");
      session.on("connecting", function () {
        console.log("CONNECT");
      });
      session.on("peerconnection", function (e) {
        console.log("1accepted");
      });
      session.on("ended", completeSession);
      session.on("failed", completeSession);
      session.on("accepted", function (e) {
        console.log("accepted");
      });
      session.on("confirmed", function (e) {
        console.log("CONFIRM STREAM");
      });
    }

    if (session.direction === "incoming") {
    //   setNewCall(true);
      // if (acceptCall) {
      console.log("call ansered");
      session.answer(options);
      // }
      console.log("stream incoming  -------->");
      session.on("connecting", function () {
        console.log("CONNECT");
      });
      session.on("peerconnection", function (e) {
        console.log("1accepted");
        add_stream();
      });
      session.on("ended", completeSession);
      session.on("failed", completeSession);
      session.on("accepted", function (e) {
        // setNewCall(false);
        console.log("accepted");
      });
      session.on("confirmed", function (e) {
        console.log("CONFIRM STREAM");
      });
      var options = {
        mediaConstraints: { audio: true, video: true },
        pcConfig: {
          rtcpMuxPolicy: "require",
          iceServers: [],
        },
      };
    }
  });

  // console.log("Incoming Call");
  // if (acceptCall) {

  // }

  ua.start();

  if (socket.readyState === WebSocket.CLOSED) {
    console.log("closed");
  }

  // Register callbacks to desired call events
  var eventHandlers = {
    progress: function (e) {
      console.log("call is in progress");
    },
    failed: function (e) {
      console.log("call failed with cause: ", e.cause);
    },
    ended: function (e) {
      console.log("call ended with cause: ", e.cause);
    },
    confirmed: function (e) {
      console.log("call confirmed");
    },
  };

  function callAsterisk(numTels) {
    var options = {
      mediaConstraints: { audio: true, video: true },
      pcConfig: {
        rtcpMuxPolicy: "require",
        iceServers: [],
      },
    };

    var numTel = numTels.toString();
    var num = "200";
    console.log(numTel);
    ua.call(numTel, options);
    add_stream();
  }

  function add_stream() {
    session.connection.addEventListener("addstream", function (e) {
      remoteAudio.srcObject = e.stream;
      // remoteView.srcObject = e.stream;
      // selfView.srcObject = session.connection.getLocalStreams()[0];
    });
  }

  function send_message() {
    console.log(text);
    var num1 = num.toString();
    var eventHandlers = {
      succeeded: function (e) {
        console.log("successfull Msg Sent");
      },
      failed: function (e) {
        console.log(e);

        console.log("Something Went Wrong");
      },
    };

    var options = {
      eventHandlers: eventHandlers,
    };
    ua.sendMessage(num1, text, options);
  }

  // console.log(session);
  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => callAsterisk(1000)}>
          {" "}
          Call to 1001{" "}
        </button>
      </div>
      <div>
        {newCall ? (
          <button className="btn btn-success" onClick={() => _acceptCall()}>
            Accept Call
          </button>
        ) : null}
      </div>
      <input type="text" name="msg" onChange={(e) => setText(e.target.value)} />
      <input
        placeholder="Number"
        type="text"
        name="num"
        onChange={(e) => setNum(e.target.value)}
      />
      <button onClick={() => send_message()}> Send </button>
      <div>
        <DisplayMsg />
      </div>
      <div>
        {" "}
        <video
          style={{ border: "2px solid black" }}
          width="200"
          id="selfView"
          autoPlay={true}
          muted={true}
        ></video>
        <video
          style={{ border: "2px solid black" }}
          width="200"
          autoPlay={true}
          id="remoteView"
        ></video>{" "}
      </div>
    </>
  );
};

export default Caller;

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { GetTraccarGroups } from "../../../../../actions/index";
import Msg from "./Msg";
import JsSIP from "jssip";
import { Beep3, Beep2, Beep1, Beep4 } from "./../../../../../Beeper/Beeper";
import Caller from "../Caller/Caller";

const Chatbox = (props) => {
  // console.error("Supervisor - Chat Box");

  const chatti = useRef("chatti");

  // const [text, setText] = useState(""); // saving msg
  const [num, setNum] = useState("1002"); // number to send msg on
  const [open, setOpen] = useState(true);
  // const [callState, setCallState] = useState(false);
  const [msg, setMsg] = useState("");
  const [localSession, setLocalSession] = useState("");
  const [ans, setAns] = useState(false);
  const [answerCallDisplay, setAnswerCallDisplay] = useState("none");
  const [ringer, setRinger] = useState(0);
  const [msgs, setMsgs] = useState([
    // {
    //   type: "r",
    //   msg: "Hello world !",
    // },
    // {
    //   type: "s",
    //   msg: "No ... Hello Zaeem !",
    // },
  ]);

  const getIcon = () => {
    if (ringer == 0) {
      return "phone";
    } else if (ringer == 1) {
      return "volume-control-phone";
    } else if (ringer == 2) {
      return "tty";
    } else {
      return "phone";
    }
  };

  const send = async () => {
    await send_message();
    console.error("Msg: ", msg);
    await setMsgs((item) => {
      return [
        ...item,
        {
          type: "s",
          msg: msg,
        },
      ];
    });
    setMsg("");
  };

  useLayoutEffect(() => {
    down();
    return;
  }, [msgs]);

  useEffect(() => {
    down();
    return;
  }, [msgs]);

  const down = () => {
    chatti.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    console.error("Going Down");
  };

  //   const ring = async () => {
  //     await Beep1();
  //   };

  const Call = () => {
    if (ringer == 0) {
      callAsterisk(num);
    } else {
      dropCall(localSession);
    }
  };

  //   let loop;

  //   useEffect(() => {
  //     if (ringer == false) {
  //       loop = setInterval(() => {
  //         if (ringer == true) {
  //           ring();
  //         }
  //       }, 300);
  //     } else {
  //       clearInterval(loop);
  //     }
  //     return;
  //   }, [ringer]);

  const recieve = async (body) => {
    console.error("Body: ", body);
    await setMsgs((item) => {
      return [
        ...item,
        {
          type: "r",
          msg: body.toString(),
        },
      ];
    });
  };

  const recievedMsgs = () => {
    return msgs.map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.type == "r" ? (
            <Msg direction="left" text={item.msg} />
          ) : (
            <Msg direction="right" text={item.msg} />
          )}
        </React.Fragment>
      );
    });
  };

  /**
   * Caller Tune baby
   **/

  var socket = new JsSIP.WebSocketInterface("wss://ss.dextrologix.com:8089/ws");
  var configuration = {
    sockets: socket,
    uri: "6002@ss.dextrologix.com",
    password: "60021234",
    use_preloaded_route: true,
  };
  var remoteAudio = new window.Audio();
  remoteAudio.autoplay = true;

  const mediaSource = new MediaSource();

  var selfView = document.getElementById("selfView");
  var remoteView = document.getElementById("remoteView");

  var ua = new JsSIP.UA(configuration);

  ua.on("connected", function (e) {
    // console.error("Socket Connected.");
  });

  ua.on("disconnected", function (e) {
    // console.error("Socket Closed. ");
  });

  ua.on("registered", function (e) {
    console.error("Registered.");
  });
  ua.on("unregistered", function (e) {
    console.error("Unregistered.");
  });
  ua.on("registrationFailed", function (e) {
    // console.error("Registeration Failed");
  });

  ua.on("newMessage", function (e) {
    // console.error("new Message", e);
    if (typeof e.request.body === "string") {
      if (e.originator === "remote") {
        recieve(e.request.body);
        // setMsg([...msg, e.request.body]);
        // if (!showChat) {
        //   setShowChat(true);
        // }
      } else if (e.originator === "local") {
        // local msg
        // recieve(e.request.body);
      }
    }
  });

  let session;

  if (localSession) {
    console.error("Local Session: ", localSession);
    if (localSession.status === 8) {
      setAnswerCallDisplay("none");
      setLocalSession("");
    }
  }

  // useEffect(() => {
  //   console.error("Sessions: ", session);
  //   return;
  // }, [session]);

  // var options = {
  //   eventHandlers: {
  //     canceled: function (data) {
  //       console.error("call cancelled", data);
  //     },
  //     failed: function (e) {
  //       console.log("call failed with cause: " + e.cause);
  //     },
  //     ended: function (e) {
  //       console.log("call ended with cause: " + e.cause);
  //     },
  //     confirmed: function (e) {
  //       console.log("call confirmed");
  //     },
  //   },
  // };

  ua.on("newRTCSession", function (ev) {
    console.error("ev event: ", ev);
    var newSession = ev.session;
    // if (session) {
    //   // hangup any existing call
    //   session.terminate();
    // }
    session = newSession;
    var completeSession = async function () {
      // console.error("session trunacated");
      // session.terminate();
      session = null;
      //   setNewCall(false);
      //   setAcceptCall(false);
      await setRinger(0);
    };

    if (session.direction === "outgoing") {
      console.error("stream outgoing  -------->");
      setLocalSession(session);
      session.on("connecting", async function () {
        console.error("CONNECT");
        await setRinger(1);
      });
      session.on("peerconnection", function (e) {
        console.error("1accepted");
      });
      session.on("ended", completeSession);
      session.on("failed", completeSession);
      session.on("accepted", async function (e) {
        console.error("accepted");
        await setRinger(2);
      });
      session.on("confirmed", function (e) {
        console.error("CONFIRM STREAM");
      });
    }

    if (session.direction === "incoming") {
      console.error("stream incoming  -------->");

      setAnswerCallDisplay("");
      // console.error(session);
      setLocalSession(session);
      session.on("ended", function () {
        console.error("Call Ended before answering");
      });
      session.on("peerconnection", function (e) {
        console.log("1accepted");
        add_stream();
      });
      session.on("failed", completeSession);
      session.on("canceled", function () {
        console.error("Call Cancelled before answering ");
      });
      var completeSession = async function () {
        // console.error("session trunacated");
        await setRinger(0);
        if (session) {
          // hangup any existing call
          session.terminate();
          setAnswerCallDisplay("none");
        }
        setLocalSession(session);
      };
    }
  });

  // console.error("JsSIP.IncomingMessage: ", JsSIP.WebSocketInterface);
  // var name = new jssip.nameaddrheader("1003@ss.dextrologix.com");
  // console.error("Name: ", name);
  const dropCall = (session) => {
    if (session) {
      // hangup any existing call
      session.terminate();
      setAnswerCallDisplay("none");
    }
    setLocalSession(session);
  };

  const answerCall = (session) => {
    var options = {
      mediaConstraints: { audio: true, video: true },
      // pcConfig: {
      //   rtcpMuxPolicy: "require",
      //   iceServers: [],
      // },
    };
    session.answer(options);
    var completeSession = async function () {
      // console.error("session trunacated");
      session = null;
      setAnswerCallDisplay("none");
      //   setNewCall(false);
      //   setAcceptCall(false);
      await setRinger(0);
    };

    //   setNewCall(true);
    // if (acceptCall) {
    console.error("call ansered");
    // }
    session.on("connecting", async function () {
      console.error("CONNECT");
      await setRinger(1);
    });
    session.on("peerconnection", function (e) {
      console.error("1accepted");
      // add_stream();
    });
    session.on("ended", completeSession);
    session.on("failed", completeSession);
    session.on("accepted", async function (e) {
      // setNewCall(false);
      console.error("accepted");
      await setRinger(2);
    });
    session.on("confirmed", function (e) {
      console.error("CONFIRM STREAM");
    });
  };
  // console.error("Incoming Call");
  // if (acceptCall) {

  // }

  ua.start();

  if (socket.readyState === WebSocket.CLOSED) {
    console.error("closed");
  }

  // Register callbacks to desired call events
  var eventHandlers = {
    progress: function (e) {
      console.error("call is in progress");
    },
    failed: function (e) {
      console.error("call failed with cause: ", e.cause);
    },
    ended: function (e) {
      console.error("call ended with cause: ", e.cause);
    },
    confirmed: function (e) {
      console.error("call confirmed");
    },
    onData: function (data) {
      console.error("On Dataaaaaa:", data);
    },
  };

  function callAsterisk(numTels) {
    var options = {
      eventHandlers: {
        onData: function (data) {
          console.error(data);
        },
        failed: function (e) {
          console.log("call failed with cause: " + e.cause);
        },
        ended: function (e) {
          console.log("call ended with cause: " + e.cause);
        },
        confirmed: function (e) {
          console.log("call confirmed");
        },
      },
    };

    var numTel = numTels.toString();
    // var num = "200";
    console.error(numTel);
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

  const send_message = async () => {
    // console.error(text);
    var num1 = num.toString();
    var eventHandlers = {
      succeeded: function (e) {
        console.error("successfull Msg Sent");
      },
      failed: function (e) {
        console.error(e);
        Beep4();
        console.error("Something Went Wrong");
      },
    };

    var options = {
      eventHandlers: eventHandlers,
    };
    await ua.sendMessage(num1, msg, options);
  };

  /**
   * Caller Tune Baby
   */

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: open ? "60vh" : "95vh",
          left: "80vw",
          zIndex: 20,
          width: "20vw",
          height: "40vh",
          background: "white",
          color: "#369",
          border: "1px solid #fff",
        }}
      >
        {/* <div style={{ height: "5vh", verticalAlign: "middle" }}>
          <div
            style={{
              //   padding: "10px",
              background: "#369",
              color: "#fff",
              border: "1px solid #fff",
              fontSize: "16px",
              height: "5vh",
              verticalAlign: "middle",
            }}
          >
            <span>
              <i className="fa fa-comments"></i> &nbsp; Bilal Bhatti
            </span>
          </div>
        </div> */}
        <div
          style={{
            marginTop: "0px",
            // marginBottom: "5vh",
            overflow: "auto",
            height: "40vh",
            verticalAlign: "down",
          }}
        >
          <div
            style={{
              height: "5vh",
              padding: "1.5vh",
              background: "#369",
              color: "#fff",
              verticalAlign: "middle",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 30,
            }}
            className="btn-block"
          >
            <i className="fa fa-comments" onClick={down}></i>
            &nbsp; Bilal Bhatti
            <span className="pull-right">
              {" "}
              <i
                style={{
                  display: answerCallDisplay,
                  color: "green",
                  fontSize: "18px",
                  textShadow: "0px 0px 2px #fff",
                  paddingRight: 10,
                }}
                onClick={() => answerCall(localSession)}
                className={"fa fa-phone"}
              ></i>
              <i
                style={{
                  display: answerCallDisplay,
                  color: "red",
                  fontSize: "18px",
                  paddingRight: 10,
                  textShadow: "0px 0px 2px #fff",
                }}
                onClick={() => dropCall(localSession)}
                className={"fa fa-phone"}
              ></i>
              <i
                style={{
                  color: "white",
                  fontSize: "18px",
                  textShadow: "0px 0px 2px #fff",
                }}
                onClick={() => Call()}
                className={"fa fa-" + getIcon()}
              ></i>{" "}
              &nbsp;{" "}
              <i
                style={{
                  color: "white",
                  fontSize: "18px",
                  textShadow: "0px 0px 2px #fff",
                }}
                className="fa fa-minus"
                onClick={() => setOpen((item) => !item)}
              ></i>
            </span>
            <div className="clearfix"></div>
          </div>
          <div
            ref={chatti}
            style={{ marginTop: "5vh", marginBottom: "5vh", overflow: "auto" }}
          >
            {recievedMsgs()}
          </div>
          <div
            style={{
              height: "5vh",
              //   padding: "1.5vh",
              background: "#369",
              color: "#fff",
              verticalAlign: "middle",
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 30,
            }}
            className="btn-block"
          >
            <input
              style={{
                width: "100%",
                height: "5vh",
                border: 0,
                outline: 0,
                background: "#eee",
                color: "#369",
                padding: "1.5vh",
                borderTop: "2px solid #369",
              }}
              value={msg}
              type="text"
              className=""
              placeholder=" Type Here ... "
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }
              }}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.logger,
  groups: state.groups,
});

const mapDispatchToProps = (dispatch) => ({
  getTraccarGroups: () => GetTraccarGroups(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);

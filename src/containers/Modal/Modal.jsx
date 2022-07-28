import React from "react";

const Modal = (props) => {
  //console.log("from model props", props);
  let title = props.title;

  if (typeof props.title == "object") {
    title = (
      <div>
        <span className="pull-left">
          <i className={"fa fa-" + props.title.symbol}></i> &nbsp;
        </span>
        <span>
          <b> {props.title.name} </b>
        </span>
        <span className="pull-right">
          <i
            className="fa fa-remove"
            data-dismiss="modal"
            data-toggle="modal"
            data-target={"#" + props.back}
          ></i>
        </span>
        <div className="clearfix"></div>
      </div>
    );
  }
  return (
    <>
      <div
        className="modal fade"
        id={props.name || "test"}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={props.name || "test"}
        aria-hidden="true"
        // style={{ width: "1000px" }}
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ width: props.big ? "1000px" : null }}
        >
          <div
            className="modal-content"
            style={{ width: props.big ? "1000px" : null }}
          >
            {props.head ? (
              <div className="modal-header">{props.head}</div>
            ) : (
              <div className="modal-header">
                <div className="modal-title" id={props.name || "test"}>
                  {title || "Anonymous"}
                  {props.close ? (
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  ) : null}
                </div>
              </div>
            )}
            <div className="modal-body">{props.children}</div>
            {props.foot ? (
              <div className="modal-footer"> {props.foot} </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

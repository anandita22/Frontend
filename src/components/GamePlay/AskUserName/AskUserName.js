import React from "react";
import { Modal } from "react-bootstrap";

const AskUserName = (props) => {
  return (
    <Modal
      className="AskUserNameModal"
      size="md"
      show={props.showAskUserName}
      animation={false}
      onHide={() => console.log("AskUserName closed!")}
    >
      <Modal.Header>
        <Modal.Title>
          <h4 className="mb-0">Enter your name</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group mb-0 position-relative">
          <input
            type="text"
            className="input px-3 py-3 rounded border-0 form-control text-capitalize"
            placeholder="John"
            maxLength="20"
            value={props.askUserName_InputValue}
            onChange={(event) => props.onUserNameChange(event)}
          />
        </div>

        <button
          type="button"
          className="text-uppercase buttonStyle_1 p-3 btn btn-primary mt-3"
          onClick={props.onUserNameSave}
        >
          Done
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default AskUserName;

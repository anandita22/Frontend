import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../Common/Button_1";

const ConfirmDelete = (props) => {
  return (
    <Modal
      size="sm"
      show={props.isDeleteGame}
      animation={false}
      onHide={props.cancelDeletGameConfirm}
    >
      <Modal.Header>
        <Modal.Title>
          <h4 className="mb-0">Are you sure?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 text-center">
              <CustomButton
                disabled={false}
                click={props.onDeletGame}
                text="Yes"
              />
            </div>
            <div className="col-6 text-center">
              <CustomButton
                disabled={false}
                click={props.cancelDeletGameConfirm}
                text="No"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;

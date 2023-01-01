import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../Common/Button_1";

const ConfirmDelete = (props) => {
  return (
    <Modal
      size="sm"
      show={props.showConfirm}
      animation={false}
      onHide={props.hideConfirm}
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
                click={props.deleteCategory}
                text="Yes"
              />
            </div>
            <div className="col-6 text-center">
              <CustomButton
                disabled={false}
                click={props.hideConfirm}
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

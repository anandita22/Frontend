import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../components/Common/Button_1";

const DeleteTournament = (props) => {
  return (
    <Modal
      size="sm"
      show={props.showDeleteTournament}
      animation={false}
      onHide={() => props.toggleDeletePopup(false)}
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
                click={props.onDeleteTournament}
                text="Yes"
              />
            </div>
            <div className="col-6 text-center">
              <CustomButton
                disabled={false}
                click={() => props.toggleDeletePopup(false)}
                text="No"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTournament;

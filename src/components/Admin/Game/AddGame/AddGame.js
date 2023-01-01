import React, { Fragment } from "react";
import { Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../../Common/Button_1";

const AddGame = (props) => {
  let gameInfoMsg =
    props.gameInfoMsg && props.gameInfoMsg.length ? (
      <p className="infoMsg mb-0">{props.gameInfoMsg}</p>
    ) : null;

  let errorStrip =
    props.isGameError === true ? (
      <Form.Group className="mb-0">
        <ul className="mb-0">
          {props.gameErrorMsgs.map((msg, i) => (
            <li key={i}>
              <p className="mb-0 text-danger">{msg}</p>
            </li>
          ))}
        </ul>
      </Form.Group>
    ) : null;

  let CTAButton =
    props.gameModalTitle === "Add Game" ? (
      <CustomButton
        isDisabled={props.isGameCTADisabled}
        click={props.onAddGame}
        text="Add"
      />
    ) : (
      <CustomButton
        isDisabled={props.isGameCTADisabled}
        click={props.onEditGame}
        text={props.gameModalTitle}
      />
    );
  return (
    <Fragment>
      <Modal
        size="lg"
        show={props.showGameModal}
        animation={false}
        onHide={() => console.log("AddGame modal closed!")}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="align-items-center">
          <h4 className="mb-0">{props.gameModalTitle}</h4>
          <FontAwesomeIcon
            className="fontIcon c-pointer"
            icon={faTimes}
            onClick={props.closeGameModal}
          />
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Id"
                name="recordId"
                value={props.gameDetails._id}
                className="input px-3 py-3 rounded border-0"
                readOnly={true}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={(event) => props.onGameFieldChange("name", event)}
                value={props.gameDetails.name}
                className="input px-3 py-3 rounded border-0"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Iframe URL"
                name="iframeURL"
                onChange={(event) =>
                  props.onGameFieldChange("iframeURL", event)
                }
                value={props.gameDetails.iframeURL}
                className="input px-3 py-3 rounded border-0"
              />

              <p className="mb-3">
                Note: Remove Iframe URL is you want to upload zip
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Slug"
                name="slug"
                onChange={(event) => props.onGameFieldChange("slug", event)}
                value={props.gameDetails.slug}
                className="input px-3 py-3 rounded border-0"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={props.gameDetails.category}
                className="select"
                as="select"
                custom
                onChange={(event) => props.onGameFieldChange("category", event)}
              >
                <option value="">Select category</option>
                {props.categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                value={props.gameDetails.leaderboard}
                className="select"
                as="select"
                custom
                onChange={(event) =>
                  props.onGameFieldChange("leaderboard", event)
                }
              >
                <option value="">Select leaderboard</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                value={props.gameDetails.hidden}
                className="select"
                as="select"
                custom
                onChange={(event) =>
                  props.onGameFieldChange("hidden", event)
                }
              >
                <option value="">Select hidden</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Priority"
                name="priority"
                onChange={(event) => props.onGameFieldChange("priority", event)}
                value={props.gameDetails.priority}
                className="input px-3 py-3 rounded border-0"
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                id="image"
                label={props.gameImageText}
                custom
                onChange={(event) => props.onFileChange("gameImageText", event)}
                accept="image/png,image/gif,image/jpeg"
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                id="game_zip"
                label={props.gameZipText}
                custom
                onChange={(event) => props.onFileChange("gameZipText", event)}
                accept=".zip"
              />
            </Form.Group>

            {errorStrip}
            {gameInfoMsg}
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-block">{CTAButton}</Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddGame;

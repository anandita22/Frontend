import React, { Fragment } from "react";
import { Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../Common/Button_1";
import Flatpickr from "react-flatpickr";

import constants from "../../../config/constants";

import "../../../../node_modules/flatpickr/dist/flatpickr.min.css";

const AddTournament = (props) => {
  let addTournamentResMsg =
    props.addTournamentResMsg && props.addTournamentResMsg.length ? (
      <p className="infoMsg mb-0">{props.addTournamentResMsg}</p>
    ) : null;

  let errorStrip =
    props.addTournamentError === true ? (
      <Form.Group className="mb-0">
        <ul className="mb-0">
          {props.tournamentFormErrors.map((msg, i) => (
            <li key={i}>
              <p className="mb-0 text-danger">{msg}</p>
            </li>
          ))}
        </ul>
      </Form.Group>
    ) : null;

  const tournamentStatus = [];
  for (let i in constants.TOURNAMENT) {
    tournamentStatus.push(constants.TOURNAMENT[i]);
  }

  return (
    <Fragment>
      <Modal
        size="lg"
        show={props.showAddTournament}
        animation={false}
        onHide={() => console.log("AddGame modal closed!")}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="align-items-center">
          <h4 className="mb-0">{props.tournamentModalTitle}</h4>
          <FontAwesomeIcon
            className="fontIcon c-pointer"
            icon={faTimes}
            onClick={() => props.toggleAddTournament(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Game Id"
                name="game"
                onChange={(event) =>
                  props.onTournamentFieldChange("game", event)
                }
                value={props.tournamentData.game}
                className="input px-3 py-3 rounded border-0"
              />
            </Form.Group>
            <Form.Group>
              <Flatpickr
                id="tournamentEndTime"
                className="input rounded p-3 w-100"
                options={{
                  minDate: new Date(),
                  dateFormat: "D, M d, Y G:i K",
                  disableMobile: "true",
                  enableTime: true,
                  defaultDate: new Date(),
                }}
                placeholder="End date"
                value="Test"
                onChange={(date) =>
                  props.onTournamentFieldChange("endDate", date)
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Max Score Per Minute"
                name="maxScorePerMinute"
                onChange={(event) =>
                  props.onTournamentFieldChange("maxScorePerMinute", event)
                }
                value={props.tournamentData.maxScorePerMinute}
                className="input px-3 py-3 rounded border-0"
              />
            </Form.Group>
            {props.tournamentData.prizes.map((prize, i) => {
              let addPrize = null;
              let removePrize = null;
              if (i >= 2) {
                addPrize = (
                  <FontAwesomeIcon
                    className="fontIcon c-pointer"
                    icon={faPlusCircle}
                    onClick={props.addPrize}
                  />
                );
              }

              if (i > 2) {
                removePrize = (
                  <FontAwesomeIcon
                    className="fontIcon c-pointer"
                    icon={faMinusCircle}
                    onClick={() => props.removePrize(i)}
                  />
                );
              }

              return (
                <div className="d-flex mb-3 align-items-center" key={i}>
                  <div className="w-100 mr-3">
                    <Form.Control
                      type="text"
                      placeholder="Position"
                      name="position"
                      onChange={(event) =>
                        props.onPrizeFieldChange(i, "position", event)
                      }
                      value={prize.position}
                      className="input px-3 py-3 rounded border-0"
                    />
                  </div>
                  <div className="w-100 ml-3">
                    <div className="d-flex align-items-center">
                      <div className="w-100">
                        <Form.Control
                          type="number"
                          placeholder="Prize"
                          name="game"
                          onChange={(event) =>
                            props.onPrizeFieldChange(i, "prize", event)
                          }
                          value={prize.prize}
                          className="input px-3 py-3 rounded border-0"
                        />
                      </div>
                      <div className={"text-right " + (i === 2 ? "ml-3" : "")}>
                        {addPrize}
                        {removePrize}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <Form.Group>
              <Form.Control
                value={props.tournamentData.status}
                className="select"
                as="select"
                custom
                onChange={(event) =>
                  props.onTournamentFieldChange("status", event)
                }
              >
                <option value="">Select tournament status</option>
                {tournamentStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {errorStrip}
            {addTournamentResMsg}
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <CustomButton
            isDisabled={props.isAddTournamentDisabled}
            click={props.onTournamentCTA}
            text={props.tournamentCTA_ButtonText}
          />
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddTournament;

import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import "../../Admin/Game/GameList/GameList.css";

const GameList = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="tableHeading text-white">No.</th>
          <th className="tableHeading text-white d-none d-lg-block">Name</th>
          <th className="tableHeading text-white">Image</th>
          <th className="tableHeading text-white">Status</th>
          <th className="tableHeading text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.tournaments.map((tournament, index) => {
          return (
            <tr key={index}>
              <td className="text-white">{index + 1}</td>
              <td className="d-none text-white d-lg-block border-bottom-0">{tournament.game.name}</td>
              <td>
                <img alt={tournament.game.name} className="gameImage" src={tournament.game.image} />
              </td>
              <td className="text-white">{tournament.status}</td>
              <td>
                <FontAwesomeIcon
                  className="mr-3 fontIcon c-pointer text-white"
                  icon={faEdit}
                  onClick={() => props.onEditTournament(tournament._id, index)}
                />
                <FontAwesomeIcon
                  className="fontIcon c-pointer text-white"
                  icon={faTrash}
                  onClick={() => props.confirmDeleteTournament(tournament._id, index)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default GameList;

import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import { limitText } from "../../../../utils/utils";

import "./GameList.css";

const GameList = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="tableHeading text-white">No.</th>
          <th className="tableHeading text-white">Name</th>
          <th className="tableHeading text-white">Image</th>
          <th className="tableHeading text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.games.map((game, index) => {
          return (
            <tr key={index}>
              <td className="text-white">{index + 1}</td>
              <td className="text-white">{limitText(game.name, 10)}</td>
              <td>
                <Link
                  className="d-inline-block"
                  target="_blank"
                  to={`/play/${game.slug}`}
                >
                  <img alt={game.name} className="gameImage" src={game.image} />
                </Link>
              </td>
              <td>
                <FontAwesomeIcon
                  className="mr-3 fontIcon c-pointer text-white"
                  icon={faEdit}
                  onClick={() => props.onEditButton(game._id, game.slug)}
                />
                <FontAwesomeIcon
                  className="fontIcon c-pointer text-white"
                  icon={faTrash}
                  onClick={() => props.showDeletGameConfirm(game._id)}
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

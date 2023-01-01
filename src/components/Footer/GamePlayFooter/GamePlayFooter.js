import React from "react";
import { Link } from "react-router-dom";
import FooterMenuIcon from "../FooterMenuIcon/FooterMenuIcon";

import "../Footer.css";

const GamePlayFooter = (props) => {
  return (
    <footer className="footer py-2">
      <div className="row">
        <div
          className={`col-6 text-center ${
            props.leaderboard === false ? "col-12" : ""
          }`}
        >
          <Link to="/">
            <FooterMenuIcon icon="home" />
          </Link>
        </div>
        <div
          className={`col-6 text-center ${
            props.leaderboard === false ? "d-none" : "d-block"
          }`}
        >
          <FooterMenuIcon icon="leaderboard" {...props} />
        </div>
      </div>
    </footer>
  );
};

export default GamePlayFooter;

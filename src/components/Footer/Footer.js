import React from "react";
import { Link } from "react-router-dom";
import FooterMenuIcon from "./FooterMenuIcon/FooterMenuIcon";

import "./Footer.css";

const Footer = (props) => {
  return (
    <footer className="footer py-2">
      <div className="row">
        <div className="col-4 text-center">
          <Link to="/">
            <FooterMenuIcon icon="home" />
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link to="/battles">
            <FooterMenuIcon icon="battle" />
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link to="/tournaments">
            <FooterMenuIcon icon="tournament" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

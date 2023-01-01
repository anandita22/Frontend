import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";

import hamburgerLogo from "../../assets/images/hamburgerBars.svg";
const Header = (props) => {
  return (
    <Fragment>
      <header className="px-3 py-md-3 py-2 headerBg fixed-top">
        <div className="row align-items-center">
          <div className="col-4">
            <h3 className="mb-0">
              <img
                src={hamburgerLogo}
                alt="C2GamesStudio"
                className="c-pointer"
              />
            </h3>
          </div>
          <div className="col-4 text-center">
            <Link to="/" className="d-inline-block">
              <h3 className="mb-0 py-1 text-white">Home</h3>
            </Link>
          </div>
        </div>
      </header>
      <div className="extraSpace"></div>
    </Fragment>
  );
};

export default withRouter(Header);

import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import GamesLogoColor from "../../../assets/images/game-controller.svg";
import GamesLogo from "../../../assets/images/game-controller_withoutcolor.svg";
import BattleLogo from "../../../assets/images/battle.svg";
import BattleLogoColor from "../../../assets/images/battle_icon_color.png";
import TournamentLogo from "../../../assets/images/tournament_icon.svg";

import "./FooterMenuIcon.css";

const FooterMenuIcon = (props) => {
  let menuIcon = null;

  if (props.icon === "home") {
    menuIcon = (
      <Fragment>
        <img className="FooterMenuLogo" src={GamesLogo} alt="games"></img>
        <span className="mt-1 d-block footerLinkWithoutColor">Games</span>
      </Fragment>
    );

    if (props.location.pathname === "/") {
      menuIcon = (
        <Fragment>
          <img
            className="FooterMenuLogo"
            src={GamesLogoColor}
            alt="games"
          ></img>
          <span className="mt-1 d-block footerLinkColor">Games</span>
        </Fragment>
      );
    }

    return menuIcon;
  }

  if (props.icon === "battle") {
    menuIcon = (
      <Fragment>
        <img src={BattleLogo} className="FooterMenuLogo" alt="battle"></img>
        <span className="mt-1 d-block footerLinkWithoutColor">Battle</span>
      </Fragment>
    );

    if (props.location.pathname === "/battles") {
      menuIcon = (
        <Fragment>
          <img
            src={BattleLogoColor}
            className="FooterMenuLogo"
            alt="battle"
          ></img>
          <span className="mt-1 d-block footerLinkColor">Battle</span>
        </Fragment>
      );
    }

    return menuIcon;
  }

  if (props.icon === "tournament") {
    menuIcon = (
      <Fragment>
        <img className="FooterMenuLogo" src={TournamentLogo} alt="battle"></img>
        <span className="mt-1 d-block footerLinkWithoutColor">Tournaments</span>
      </Fragment>
    );

    if (props.location.pathname === "/tournaments") {
      menuIcon = (
        <Fragment>
          <img
            className="FooterMenuLogo"
            src={TournamentLogo}
            alt="battle"
          ></img>
          <span className="mt-1 d-block footerLinkColor">Tournaments</span>
        </Fragment>
      );
    }

    return menuIcon;
  }

  if (props.icon === "leaderboard") {
    menuIcon = (
      <Fragment>
        <img
          onClick={() => props.toggleLeaderboard(true)}
          className="FooterMenuLogo"
          src={TournamentLogo}
          alt="leaderboard"
        ></img>
        <span
          className="mt-1 d-block footerLinkWithoutColor"
          onClick={() => props.toggleLeaderboard(true)}
        >
          Leaderboard
        </span>
      </Fragment>
    );

    return menuIcon;
  }
};

export default withRouter(FooterMenuIcon);

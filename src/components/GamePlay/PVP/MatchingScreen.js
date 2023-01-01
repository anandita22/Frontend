import React, { Fragment } from "react";
import { limitText } from "../../../utils/utils";
import constants from "../../../config/constants";

import pvpIcon from "../../../assets/images/pvp/player-vs-player.png";
import vsIcon from "../../../assets/images/pvp/VS.png";
import iconsGif from "../../../assets/images/pvp/super-hero-GIF.gif";

import "./PVP.css";

const MatchingScreen = (props) => {
  let matchingTimer = null;

  if (props.matchingTimer < 10) {
    matchingTimer = (
      <span className="d-inline-block">{props.matchingTimer}</span>
    );
  }

  return (
    <Fragment>
      <div className="parentWrapper h-100 position-absolute w-100 matchingScreenWrapper leaderboardWrapper matchingScreenWrapper_Landscape">
        <div className="container-fluid py-3 leaderBoardHeader">
          <div className="row">
            <div className="col-12 text-center">
              <a className="d-inline-block">
                <img
                  className="img-fluid spideyGamesImage"
                  src={pvpIcon}
                  alt={constants.SITE_META.TITLE}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="container py-md-3 py-2 leaderBoard">
          <div className="row justify-content-center mb-3">
            <div className="col-12 text-center">
              <h3
                className={`leaderBoardText gameText text-white matchingScreenTitle ${
                  props.isLandscapeMode === true ? "my-2" : "mt-3 mb-5"
                }`}
              >
                {props.gameName}
              </h3>

              <h3 className="mt-2 mb-3 leaderBoardText matchingScreenTitle gameText">
                <span className="d-inline-block text-white">{matchingTimer}s</span>
              </h3>

              <h5 className="mb-2 text-white">{props.findingMatchText}</h5>
            </div>
          </div>
          <div className="row playerImagesWrapper align-items-center">
            <div className="col-5 text-center">
              <img
                className="img-fluid pvpUserImage"
                src={props.PVP_MATCH.USER_1.userImage}
                alt={props.PVP_MATCH.USER_1.userName}
              />
            </div>
            <div className="col-2 px-0 text-center">
              <img
                className="img-fluid d-block mx-auto vsIcon"
                src={vsIcon}
                alt="VS"
              />
            </div>
            <div className="col-5 text-center">
              <img
                className="img-fluid pvpUserImage PVP_MATCH_OpponentImage"
                src={iconsGif}
                alt={props.PVP_MATCH.USER_2.userName}
              />
            </div>
          </div>
          <div className="row playerNamesWrapper mt-3">
            <div className="col-5 text-center">
              <h5 className="mb-0 text-white">
                {limitText(props.PVP_MATCH.USER_1.userName, 12)}
              </h5>
            </div>
            <div className="col-2 px-0"></div>
            <div className="col-5 text-center">
              <h5 className="mb-0 text-white PVP_MATCH_OpponentName">
                {limitText(props.PVP_MATCH.USER_2.userName, 12)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MatchingScreen;

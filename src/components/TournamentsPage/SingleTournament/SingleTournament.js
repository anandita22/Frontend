import React from "react";
import { Link } from "react-router-dom";

import {
  getTournamentTotalAmount,
  getTotalPrizeUsers,
} from "../../../utils/utils";

import "./SingleTournament.css";

import clockLogo from "../../../assets/images/clock_icon.png";

const SingleTournament = (props) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-12">
        <div className="bg-white px-4 pt-4 pb-5 singleTournamentGameWrapper">
          <div className="d-flex align-items-center mb-3">
            <div className="mr-3">
              <img
                className="torniGameImage"
                alt={props.tournament.game.name}
                src={props.tournament.game.image}
              />
            </div>
            <div>
              <h3 className="mb-1 text-uppercase torniGameName">
                {props.tournament.game.name}
              </h3>
              <div className="d-flex align-items-center">
                <img
                  alt="clock"
                  className="mr-2 torniClockIcon"
                  src={clockLogo}
                />
                <span className="d-inline-block torniTimeText">
                  {props.tournament.time.days}d {props.tournament.time.hours}h{" "}
                  {props.tournament.time.minutes}m{" "}
                  {props.tournament.time.seconds}s
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="d-block torniInfoText">Winners</span>
              <span className="d-block text-left torniInfoText_Bold">
                {getTotalPrizeUsers(props.tournament.prizes)}
              </span>
            </div>
            <div>
              <span className="d-block torniInfoText">Prize Pool</span>
              <span className="d-block text-right torniInfoText_Bold">
                {getTournamentTotalAmount(props.tournament.prizes)}
              </span>
            </div>
          </div>
        </div>
        <Link
          to={{
            pathname: `/play/${props.tournament.game.slug}`,
          }}
          className="c-pointer d-block"
        >
          <button className="btn btn-block border-0 position-relative torniPlayBtn">
            Play
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleTournament;

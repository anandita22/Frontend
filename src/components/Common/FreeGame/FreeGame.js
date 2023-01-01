import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { limitText } from "../../../utils/utils";

import "./FreeGame.css";

import playIcon from "../../../assets/images/play_arrow_icon.svg";
import moreGames_Bg from "../../../assets/images/more_games_bg.png";

const FreeGame = (props) => {
  const games = props.games.map((game, index) => {
    return (
      <div
        className={`singleGameWrapper bg-white mr-2 mr-lg-5 ${
          index === 0 ? "ml-3" : ""
        }`}
        key={index}
      >
        <Link
          to={{
            pathname: `/play/${game.slug}`,
            data: {
              gameURL: game.URL,
            },
          }}
          className="c-pointer d-inline-block"
        >
          <div className="singleGameWrapper__Child text-center position-relative">
            <img
              title={game.name}
              className="img-fluid gameImage"
              src={game.image}
              alt={game.name}
            />
            <div className="d-flex justify-content-center">
              <span className="d-block FreeGameWrapper__gameName mt-2 mb-3 mr-1">
                {limitText(game.name, 11)}
              </span>
              <img
                src={playIcon}
                className="FreeGameWrapper__playNow position-absolute"
                alt="Play Now"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  });
  if (props.games && props.games.length === 8) {
    let moreCard = (
      <div className={`singleGameWrapper bg-white mr-2`} key={"asdasdas"}>
        <Link
          to={{
            pathname: `/category/${props.category}`,
          }}
          className="c-pointer d-inline-block"
        >
          <div className="singleGameWrapper__Child text-center position-relative">
            <img
              title="More"
              className="img-fluid gameImage"
              src={moreGames_Bg}
              alt="More"
            />
            <FontAwesomeIcon className="position-absolute moreGamesIcon" icon={faAngleDoubleRight} />
            <div className="d-flex justify-content-center">
              <span className="d-block FreeGameWrapper__gameName mt-2 mb-3 mr-1">
                More Games
              </span>
              <img
                src={playIcon}
                className="FreeGameWrapper__playNow position-absolute"
                alt="More"
              />
            </div>
          </div>
        </Link>
      </div>
    );

    games.push(moreCard);
  }
  return (
    <div className="d-flex justify-content-start FreeGameWrapper pb-4 mb-lg-5 mb-3">
      {games}
    </div>
  );
};

export default FreeGame;

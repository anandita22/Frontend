import React from "react";
import { Link } from "react-router-dom";

import { limitText } from "../../../utils/utils";

import "../../Common/FreeGame/FreeGame.css";

import playIcon from "../../../assets/images/play_arrow_icon.svg";

const CategoryGamesList = (props) => {
  return (
    <div className="container-fluid">
      <div className={`row justify-content-center flex-wrap pb-4`}>
        {props.games.map((game, index) => {
          return (
            <div
              className={`singleGameWrapper bg-white mb-4 ${
                (index + 1) % 3 === 0 ? "mr-0" : "mr-3"
              }`}
              key={index}
            >
              <Link
                to={`/category/${game.slug}`}
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
        })}
      </div>
    </div>
  );
};

export default CategoryGamesList;

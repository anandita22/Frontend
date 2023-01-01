import React from "react";
import { Link } from "react-router-dom";
import "./CategoryLinks.css";

import allGames from "../../../assets/images/games_icon.svg";
import puzzleGames from "../../../assets/images/games_icon.svg";
import actionGames from "../../../assets/images/action_icon.svg";
import sportsGames from "../../../assets/images/sports_icon.svg";

const CategoryLinks = (props) => {
  return (
    <div className="d-flex pt-3 pt-lg-4 pb-lg-3 CategoryLinksParentWrapper justify-content-around">
      <Link className="d-inline-block" to="/">
        <span className="d-inline-block justify-content-start CategoryLinksWrapper CategoryLinksWrapper_AllGames mr-2">
          <div className="d-flex align-items-center">
            <img src={allGames} className="categoryLinkIcon" alt="All Games" />
            <span className="ml-1 d-inline-block CategoryLinks_Text text-capitalize">
              All Games
            </span>
          </div>
        </span>
      </Link>
      <Link className="d-inline-block" to="/category/puzzle">
        <span className="d-inline-block justify-content-start CategoryLinksWrapper mr-2">
          <div className="d-flex align-items-center">
            <img
              src={puzzleGames}
              className="categoryLinkIcon"
              alt="All Games"
            />
            <span className="ml-1 d-inline-block CategoryLinks_Text text-capitalize">
              Puzzle
            </span>
          </div>
        </span>
      </Link>
      <Link className="d-inline-block" to="/category/action">
        <span className="d-inline-block justify-content-start CategoryLinksWrapper mr-2">
          <div className="d-flex align-items-center">
            <img
              src={actionGames}
              className="categoryLinkIcon"
              alt="All Games"
            />
            <span className="ml-1 d-inline-block CategoryLinks_Text text-capitalize">
              Action
            </span>
          </div>
        </span>
      </Link>
      <Link className="d-inline-block" to="/category/sports">
        <span className="d-inline-block justify-content-start CategoryLinksWrapper">
          <div className="d-flex align-items-center">
            <img
              src={sportsGames}
              className="categoryLinkIcon"
              alt="All Games"
            />
            <span className="ml-1 d-inline-block CategoryLinks_Text text-capitalize">
              Sports
            </span>
          </div>
        </span>
      </Link>
    </div>
  );
};

export default CategoryLinks;

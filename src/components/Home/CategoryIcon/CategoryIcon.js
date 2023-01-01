import React from "react";

import actionLogo from "../../../assets/images/Action_Icon_game.svg";
import sportsLogo from "../../../assets/images/Sports_Icon_game.svg";
import puzzleLogo from "../../../assets/images/Puzzle_icon_game.svg";

const CategoryIcon = (props) => {
  let img = actionLogo;
  if (props.name === "sports") {
    img = sportsLogo;
  } else if (props.name === "puzzle") {
    img = puzzleLogo;
  }
  return <img src={img} alt={props.name}></img>;
};

export default CategoryIcon;

import React from "react";
import LeaderboardEntry from "./LeaderboardEntry/LeaderboardEntry";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/images/logo_new.png";
import backLogo from "../../../assets/images/back_icon.png";
import upArrow1 from "../../../assets/images/up_arrow.png";
import upArrow2 from "../../../assets/images/up_arrow2.png";
import topUserCircle from "../../../assets/images/circle_1.png";
import topUserCrown from "../../../assets/images/crowns_icon.png";

const Leaderboard = (props) => {
  // let leaderboardUserInfo = null;

  // if (props.isLogin === true) {
  //   leaderboardUserInfo = (
  //     <div className="loginSignupWrapper text-center py-3 mb-4">
  //       <div className="d-flex align-items-center justify-content-center">
  //         <div className="text-center mr-md-4 mr-3">
  //           <img
  //             className="rounded-circle userImage mb-2"
  //             src={props.leaderboardData.userData.image}
  //             alt={props.leaderboardData.userData.name}
  //           />
  //           <h4 className="gameName text-capitalize">
  //             {props.leaderboardData.userData.name}
  //           </h4>
  //         </div>
  //         <div className="d-flex align-items-center ml-md-4 ml-3">
  //           <div className="text-center mr-4">
  //             <h4 className="gameName text-capitalize scoreHeading">Score</h4>
  //             <span className="d-block scoreValue">
  //               {props.leaderboardData.userData.userScore}
  //             </span>
  //           </div>
  //           <div className="text-center">
  //             <h4 className="gameName text-capitalize scoreHeading">Rank</h4>
  //             <span className="d-block scoreValue">
  //               #{props.leaderboardData.userData.userRank}
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  let firstRank = (
    <div>
      <img
        className="topUserWrapper position-absolute"
        alt="First"
        src={topUserCircle}
      />
      <img
        alt=""
        className="topUserImage position-absolute rounded-circle"
        src="http://localhost:4000/assets/users/user9.png"
      />
      <img
        alt=""
        className="topUserImage position-absolute topUserCrown"
        src={topUserCrown}
      />
      <div className="topUserRankWrapper text-center topUserImage position-absolute">
        <span className="d-block text-white mb-2">--</span>
      </div>
    </div>
  );

  let secondRank = (
    <div className="userImageWrapper position-relative rounded-circle text-center">
      <div className="d-inline-block text-center position-absolute iconRankWrapper">
        <span className="text-white d-block">2</span>
        <img alt="secondUser" className="arrowIcon" src={upArrow1} />
      </div>
      <img
        alt=""
        className="leaderUserImage rounded-circle"
        src="http://localhost:4000/assets/users/user9.png"
      />
      <span className="d-block text-white mt-3 mb-2">--</span>
    </div>
  );

  let thirdRank = (
    <div className="userImageWrapper position-relative rounded-circle text-center">
      <div className="d-inline-block text-center position-absolute iconRankWrapper">
        <span className="text-white d-block">3</span>
        <img alt="secondUser" className="arrowIcon" src={upArrow2} />
      </div>
      <img
        alt=""
        className="leaderUserImage rounded-circle"
        src="http://localhost:4000/assets/users/user9.png"
      />
      <span className="d-block text-white mt-3 mb-2">--</span>
    </div>
  );

  if (
    props.leaderboardData.allScores &&
    props.leaderboardData.allScores.length
  ) {
    firstRank = (
      <div>
        <img
          className="topUserWrapper position-absolute"
          alt="First"
          src={topUserCircle}
        />
        <img
          alt={props.leaderboardData.allScores[0].user.name}
          className="topUserImage position-absolute rounded-circle"
          src={props.leaderboardData.allScores[0].user.image}
        />
        <img
          alt=""
          className="topUserImage position-absolute topUserCrown"
          src={topUserCrown}
        />
        <div className="topUserRankWrapper text-center topUserImage position-absolute">
          <span className="d-block text-white mb-2">
            {props.leaderboardData.allScores[0].score}
          </span>
          <span className="d-block text-white">
            {props.leaderboardData.allScores[0].user.name}
          </span>
        </div>
      </div>
    );

    if (props.leaderboardData.allScores.length > 1) {
      secondRank = (
        <div className="userImageWrapper position-relative rounded-circle text-center">
          <div className="d-inline-block text-center position-absolute iconRankWrapper">
            <span className="text-white d-block">2</span>
            <img alt="secondUser" className="arrowIcon" src={upArrow1} />
          </div>
          <img
            alt={props.leaderboardData.allScores[1].user.name}
            className="leaderUserImage rounded-circle"
            src={props.leaderboardData.allScores[1].user.image}
          />
          <span className="d-block text-white mt-3 mb-2">
            {props.leaderboardData.allScores[0].score}
          </span>
          <span className="d-block text-white">
            {props.leaderboardData.allScores[0].user.name}
          </span>
        </div>
      );
    }

    if (props.leaderboardData.allScores.length > 2) {
      thirdRank = (
        <div className="userImageWrapper position-relative rounded-circle text-center">
          <div className="d-inline-block text-center position-absolute iconRankWrapper">
            <span className="text-white d-block">3</span>
            <img alt="secondUser" className="arrowIcon" src={upArrow2} />
          </div>
          <img
            alt={props.leaderboardData.allScores[2].user.name}
            className="leaderUserImage rounded-circle"
            src={props.leaderboardData.allScores[2].user.image}
          />
          <span className="d-block text-white mt-3 mb-2">
            {props.leaderboardData.allScores[2].score}
          </span>
          <span className="d-block text-white">
            {props.leaderboardData.allScores[2].user.name}
          </span>
        </div>
      );
    }
  }

  return (
    <div id="leaderboard" className="position-absolute bg-white w-100">
      <header className="px-3 headerBg">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-3 px-0 text-left">
              <img
                className="backLogo"
                onClick={props.toggleLeaderboard}
                src={backLogo}
                alt="Back"
              />
            </div>
            <div className="col-9 text-left">
              <h1 className="my-lg-4 my-3 text-uppercase text-white pageHeading ml-2">
                Leaderboard
              </h1>
            </div>
          </div>
        </div>
      </header>
      <div className="topUsersWrapper d-flex justify-content-between align-items-center px-1 position-relative mb-3">
        {secondRank}
        {firstRank}
        {thirdRank}
      </div>
      <LeaderboardEntry scores={props.leaderboardData.allScores.splice(3)} />
    </div>
  );
};

export default Leaderboard;

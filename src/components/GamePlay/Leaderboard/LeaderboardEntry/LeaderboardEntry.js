import React, { Fragment } from "react";
import "./LeaderboardEntry.css";

import upArrow1 from "../../../../assets/images/up_arrow.png";

const LeaderboardEntry = (props) => {
  return (
    <Fragment>
      {props.scores.map((score, index) => {
        return (
          <div
            className="leaderboardEntryWrapper mx-3 py-2 px-3 mb-3"
            key={index}
          >
            <div className="row align-items-center">
              <div className="col-8">
                <div className="d-flex align-items-center">
                  <div className="text-center mr-3">
                    <span className="d-block">{index + 4}</span>
                    <img alt="arrow" className="arrowIcon" src={upArrow1} />
                  </div>
                  <div className="mr-3">
                    <img
                      alt={score.user.name}
                      className="rounded-circle leaderboardEntryImage"
                      src={score.user.image}
                    />
                  </div>
                  <div>
                    <span className="d-block">{score.user.name}</span>
                  </div>
                </div>
              </div>
              <div className="col-4 text-right">
                <span className="d-block leaderboardEntryScore">
                  {score.score}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default LeaderboardEntry;

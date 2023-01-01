import React from "react";

import "./TournamentTimer.css";

const TournamentTimer = (props) => {
  return (
    <div className="d-flex">
      <div className="text-center">
        <span className="d-block">{props.time.days}</span>
        <span className="d-inline-block timeText">Days</span>
      </div>
      <span className="d-inline-block mx-sm-2 mx-1 timerDivider position-relative">
        :
      </span>
      <div className="text-center">
        <span className="d-block">{props.time.hours}</span>
        <span className="d-inline-block timeText">Hours</span>
      </div>
      <span className="d-inline-block mx-sm-2 mx-1 timerDivider position-relative">
        :
      </span>
      <div className="text-center">
        <span className="d-block">{props.time.minutes}</span>
        <span className="d-inline-block timeText">Mins</span>
      </div>
      <span className="d-inline-block mx-sm-2 mx-1 timerDivider position-relative">
        :
      </span>
      <div className="text-center">
        <span className="d-block">{props.time.seconds}</span>
        <span className="d-inline-block timeText">Secs</span>
      </div>
    </div>
  );
};

export default TournamentTimer;

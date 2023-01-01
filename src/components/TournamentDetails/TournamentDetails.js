import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import * as io from "socket.io-client";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import CustomButton from "../Common/Button_1";
import TournamentTimer from "../TournamentsPage/SingleTournament/TournamentTimer/TournamentTimer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

import axios from "../../config/axios";
import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

import "./TournamentDetails.css";

export default class TournamentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLogin: false,
      tournamentDetails: {},
      time: {
        days: "--",
        hours: "--",
        minutes: "--",
        seconds: "--",
      },
    };
    this.socket = io(constants.baseURL);
  }

  async getTournamentDetails(tournamentId) {
    const result = await axios.getRequest(`/api/v1/tournament/${tournamentId}`);
    if (result.success === true) {
      return result.data;
    } else {
      return null;
    }
  }

  async componentDidMount() {
    const torniId = this.props.location.pathname.split("/tournament/")[1];

    if (torniId) {
      let isAdmin = false;
      let isLogin = false;
      const loginData = checkLogin();

      if (loginData.success === true) {
        isLogin = true;

        if (loginData.data.role === constants.USER_ROLES.ADMIN) {
          isAdmin = true;
        }
      }

      this.setState({
        ...this.state,
        isAdmin,
        isLogin,
        loader: false,
      });

      const tournamentDetails = await this.getTournamentDetails(torniId);
      if (tournamentDetails) {
        this.setState({ ...this.state, tournamentDetails });

        this.socket.on("tournamentTimer", (data) => {
          this.updateTournamentTimes(data.allTimes);
        });
      }
    } else {
    }
  }

  updateTournamentTimes(times) {
    if (times && times.length) {
      times.forEach((time) => {
        if (
          this.state.tournamentDetails &&
          this.state.tournamentDetails._id === time._id
        ) {
          this.setState({ ...this.state, time: time.time });
        }
      });
    }
  }

  render() {
    let mainHeading = <h2 className="mb-4 mb-lg-5">Tournament is Live</h2>;
    if (this.state.tournamentDetails.status === constants.TOURNAMENT.ENDED) {
      mainHeading = <h2 className="mb-4 mb-lg-5">Tournament is Live</h2>;
    }

    let prizes = null;

    if (this.state.tournamentDetails && this.state.tournamentDetails.prizes) {
      prizes = (
        <div className="row mx-0 mb-4">
          {this.state.tournamentDetails.prizes.map((prize, index) => {
            return (
              <div
                className="col-12 loginSignupWrapper mb-2 py-sm-4 py-2 px-sm-4 px-3 rounded"
                key={index}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="mb-0">Rank {prize.position}</p>
                  </div>
                  <div>
                    <p className="mb-0">
                      <FontAwesomeIcon
                        className="fontIcon mr-1"
                        icon={faRupeeSign}
                      />
                      {prize.prize}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    let tournamentImage = null;

    if (this.state.tournamentDetails && this.state.tournamentDetails.game) {
      tournamentImage = (
        <div className="col-12 text-center">
          <Link
            to={{
              pathname: `/play/${this.state.tournamentDetails.game.slug}`,
            }}
            className="c-pointer d-block"
          >
            <img
              src={
                this.state.tournamentDetails &&
                this.state.tournamentDetails.game.image
              }
              alt={
                this.state.tournamentDetails &&
                this.state.tournamentDetails.game.name
              }
            />
          </Link>
        </div>
      );
    }

    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <div className="container mt-4">
          <div className="row mb-4">
            <div className="col-12 text-center">
              {mainHeading}
              <div className="d-block mx-auto TournamentTimerWrapper tournamentDetails">
                <TournamentTimer
                  wrapperClasses="mx-auto"
                  childClasses="d-flex align-items-start justify-content-center"
                  time={this.state.time}
                  status={this.state.tournamentDetails.status}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 text-center">
              <CustomButton isDisabled={false} text="Prizes" />
            </div>
          </div>
          {prizes}
          <div className="row mb-5">{tournamentImage}</div>
        </div>
      </Fragment>
    );
  }
}

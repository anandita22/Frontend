import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import * as io from "socket.io-client";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SingleTournament from "../TournamentsPage/SingleTournament/SingleTournament";

import axios from "../../config/axios";
import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

export default class TournamentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      allTournaments: [],
    };

    this.socket = io(constants.baseURL);
    ReactGA.initialize(constants.analyticId);
  }

  updateTournamentTimes(times) {
    if (times && times.length) {
      let updatedTournaments;
      times.forEach((time) => {
        const allTournaments = [...this.state.allTournaments];
        updatedTournaments = allTournaments.map((torni) => {
          const data = torni;
          if (time._id === data._id) {
            data.time = time.time;
          }

          return data;
        });
      });

      this.setState({ ...this.state, allTournaments: updatedTournaments });
    }
  }

  async getTournaments() {
    const result = await axios.getRequest("/api/v1/tournament");
    if (result.success === true) {
      const allTournaments = [
        ...result.data.live,
        ...result.data.ended,
        ...result.data.over,
      ];

      return allTournaments.map((torni) => {
        const data = torni;
        data.time = {
          days: "--",
          hours: "--",
          minutes: "--",
          seconds: "--",
        };

        return data;
      });
    } else {
      return [];
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname);
    }, 1000);
    this.socket.on("tournamentTimer", (data) => {
      this.updateTournamentTimes(data.allTimes);
    });

    let isAdmin = false;
    let isLogin = false;
    const loginData = checkLogin();

    if (loginData.success === true) {
      isLogin = true;

      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
      }
    }

    const allTournaments = await this.getTournaments();
    this.setState({
      ...this.state,
      allTournaments,
      isAdmin,
      isLogin,
      loader: false,
    });
  }

  render() {
    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="my-lg-4 my-3 text-uppercase text-white pageHeading">
                Contest List
              </h1>
            </div>
          </div>
        </div>
        {this.state.allTournaments.map((tournament, index) => {
          return (
            <div
              key={index}
              className={`container ${
                this.state.allTournaments &&
                this.state.allTournaments.length - 1 === index
                  ? "mb-5"
                  : ""
              } ${this.state.allTournaments.length} ${index}`}
            >
              <SingleTournament tournament={tournament} />
            </div>
          );
        })}
        <Footer />
      </Fragment>
    );
  }
}

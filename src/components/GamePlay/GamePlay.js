import React, { Component } from "react";
import PVP from "./PVP/PVP";
import AskUserName from "./AskUserName/AskUserName";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Leaderboard from "./Leaderboard/Leaderboard";
import GamePlayFooter from "../Footer/GamePlayFooter/GamePlayFooter";
import axios from "../../config/axios";

import displayAd from "../../assets/js/ads";

import constants from "../../config/constants";
import "../../assets/js/custom";

import { checkLogin } from "../../utils/utils";
import { exitScreen } from "../../assets/js/custom";

import "./GamePlay.css";
import "./Leaderboard/Leaderboard.css";

export default class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isLogin: false,
      loader: true,
      gameData: {},
      leaderboardData: {
        allScores: [],
        userData: {
          userRank: "--",
          userScore: 0,
          name: "User",
          image: `${constants.baseURL}/assets/users/user10.png`,
        },
      },
      // PVP
      showAskUserName: false,
      askUserName_InputValue: "",
      matchingTimer: 0,
      isLandscapeMode: false,
      findingMatchText: "Finding a match..",
      PVP_MATCH: {
        USER_1: {
          gameID: "",
          userID: "",
          userImage: `${constants.baseURL}/assets/users/user1.png`,
          userName: "---",
          score: 0,
        },
        USER_2: {
          gameID: "",
          userID: "",
          userImage: `${constants.baseURL}/assets/users/user1.png`,
          userName: "---",
          score: 0,
        },
      },
    };
    ReactGA.initialize(constants.analyticId);
  }

  initParentChildEvents() {
    function bindEvent(element, eventName, eventHandler) {
      if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventHandler);
      }
    }

    bindEvent(window, "message", (e) => {
      if (e.data && e.data.action === "gameScore") {
        if (e.data.data.score) {
          this.sendScore(e.data.data.score);
        } else {
          console.log("Score not received!");
        }
      } else if (e.data && e.data.action === "displayAd") {
        displayAd();
      } else if (e.data && e.data.action === "askForUserName") {
        console.log("askForUserName received!!");
        exitScreen();
        this.toggleAskForUser(true);
      }
    });
  }

  toggleAskForUser(isOpen) {
    this.setState({ ...this.state, showAskUserName: isOpen });
  }

  onUserNameChange(evt) {
    this.setState({ ...this.state, askUserName_InputValue: evt.target.value });
  }

  onUserNameSave() {
    if (this.state.askUserName_InputValue) {
      console.log(this.state.askUserName_InputValue);
    }
  }

  async getGamesData(slug) {
    const result = await axios.getRequest(`/api/v1/game/${slug}`);
    if (result.success === true) {
      return result.game;
    } else {
      return "";
    }
  }

  toggleLeaderboard(isDisplay) {
    const leaderboard = document.querySelector("#leaderboard");
    if (leaderboard) {
      if (isDisplay === true) {
        this.setState({ ...this.state, loader: true });
        this.getLeaderboardScores();
      } else {
        leaderboard.classList.remove("showLeaderboard");
      }
    }
  }

  async getLeaderboardScores() {
    const result = await axios.getRequest(
      `/api/v1/leaderboard/score?gameId=${this.state.gameData._id}`
    );

    if (result.success === true) {
      this.setState({
        ...this.state,
        leaderboardData: result.data,
        loader: false,
      });
    } else {
      this.setState({ ...this.state, loader: false });
    }

    const leaderboard = document.querySelector("#leaderboard");
    leaderboard.classList.add("showLeaderboard");
  }

  onOrientationChange() {
    if ("onorientationchange" in window) {
      window.addEventListener(
        "orientationchange",
        function (event) {
          if (event.target.screen.orientation.angle === 90) {
            const iframe = document.querySelector("#gameIframe");
            iframe.style.height = "100vh";
            const gamePlayMenus = document.querySelector(".gamePlayMenus");
            gamePlayMenus.style.display = "none";
          } else {
            const iframe = document.querySelector("#gameIframe");
            iframe.style.height = "calc(100vh - 58px)";
            const gamePlayMenus = document.querySelector(".gamePlayMenus");
            gamePlayMenus.style.display = "flex";
          }
        },
        false
      );
    }
  }

  async sendScore(score) {
    try {
      const gameId = this.state.gameData && this.state.gameData._id;
      const token = localStorage.getItem("token");
      if (gameId && token) {
        const data = {
          gameId,
          score,
          token,
        };

        const result = await axios.postRequest(
          "/api/v1/leaderboard/score",
          data,
          {
            headers: { authorization: token },
          }
        );

        console.log(result.data);
      } else {
        console.log("Params missing!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname);
    }, 1000);

    let isAdmin = false;
    let isLogin = false;
    const loginData = checkLogin();
    console.log(loginData);

    const PVP_MATCH = {
      USER_1: {
        gameID: "",
        userID: "",
        userImage: `${constants.baseURL}/assets/users/user1.png`,
        userName: "---",
        score: 0,
      },
      USER_2: {
        gameID: "",
        userID: "",
        userImage: `${constants.baseURL}/assets/users/user1.png`,
        userName: "---",
        score: 0,
      },
    };

    if (loginData.success === true) {
      isLogin = true;
      PVP_MATCH.USER_1.userID = loginData.data.id;
      PVP_MATCH.USER_1.userImage = loginData.data.image;
      PVP_MATCH.USER_1.userName = loginData.data.name;

      localStorage.setItem("userID", PVP_MATCH.USER_1.userID);
      localStorage.setItem("userImage", PVP_MATCH.USER_1.userImage);
      localStorage.setItem("userName", PVP_MATCH.USER_1.userName);

      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
      }
    }

    const slug =
      this.props.location.pathname &&
      this.props.location.pathname.split("/play/")[1];
    const gameData = await this.getGamesData(slug);
    if (gameData) {
      PVP_MATCH.USER_1.gameID = gameData._id;
      localStorage.setItem("gameID", PVP_MATCH.USER_1.gameID);
      // displayAd(constants.AFG_PUB_URL);
      // console.log("displayAd fired!");

      this.setState({
        ...this.state,
        gameData,
        loader: false,
        isAdmin,
        isLogin,
        PVP_MATCH,
      });
    } else {
      window.location.assign("/");
    }

    this.onOrientationChange();
    this.initParentChildEvents();
  }

  render() {
    let iframeURL = this.state.gameData.URL;
    if (this.state.gameData.iframeURL) {
      iframeURL = this.state.gameData.iframeURL;
    }

    let leaderboardButton = false;
    if (this.state.gameData && this.state.gameData.leaderboard === "Yes") {
      leaderboardButton = true;
    }

    let tournamentGame = false;
    if (
      this.props.location.pathname &&
      this.props.location.pathname.includes("torni")
    ) {
      tournamentGame = true;
    }

    let PVP_ = null;

    if (this.state.isLogin === true) {
      PVP_ = (
        <PVP
          matchingTimer={this.state.matchingTimer}
          isLandscapeMode={this.state.isLandscapeMode}
          gameName={this.state.gameData.name}
          findingMatchText={this.state.findingMatchText}
          PVP_MATCH={this.state.PVP_MATCH}
        />
      );
    }

    return (
      <div>
        <div id="adHolder">
          <video id="contentElement"></video>
          <div id="adContainer"></div>
        </div>
        <div className="adLoadingWrapper">
          <span>Loading..</span>
        </div>

        <Loader show={this.state.loader} />
        <iframe
          id="gameIframe"
          title="Game"
          frameBorder="0"
          src={iframeURL}
        ></iframe>

        <GamePlayFooter
          toggleLeaderboard={this.toggleLeaderboard.bind(this)}
          leaderboard={leaderboardButton}
        />

        <Leaderboard
          isTournament={tournamentGame}
          isLogin={this.state.isLogin}
          leaderboardData={this.state.leaderboardData}
          toggleLeaderboard={this.toggleLeaderboard.bind(this)}
          gameName={this.state.gameData.name}
          gameImage={this.state.gameData.image}
        />

        {PVP_}
        <AskUserName
          showAskUserName={this.state.showAskUserName}
          askUserName_InputValue={this.state.askUserName_InputValue}
          onUserNameChange={this.onUserNameChange.bind(this)}
          onUserNameSave={this.onUserNameSave.bind(this)}
        />
      </div>
    );
  }
}

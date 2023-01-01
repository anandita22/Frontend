import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import FreeGame from "../Common/FreeGame/FreeGame";
import HomeCarousel from "../Home/Carousel/Carousel";
import TopCategory from "../Home/TopCategory/TopCategory";
import Footer from "../Footer/Footer";
import CategoryIcon from "./CategoryIcon/CategoryIcon";
import CategoryLinks from "./CategoryLinks/CategoryLinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import axios from "../../config/axios";
import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      homeGames: [],
    };
    ReactGA.initialize(constants.analyticId);
  }

  async getHomeGames() {
    const result = await axios.getRequest("/api/v1/game/home");
    if (result.success === true) {
      return result.data;
    } else {
      return [];
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname);
    }, 1000);

    let isAdmin = false;
    let isLogin = false;
    const loginData = checkLogin();

    if (loginData.success === true) {
      isLogin = true;

      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
      }
    }

    const homeGames = await this.getHomeGames();

    this.setState({
      ...this.state,
      homeGames,
      isLogin,
      isAdmin,
      loader: false,
    });
  }

  render() {
    let gamesContent = (
      <p className="my-md-5 my-4 text-center text-white">No games found!</p>
    );

    if (this.state.homeGames && this.state.homeGames.length) {
      gamesContent = this.state.homeGames.map((games, i) => {
        let categoryLinks = null;

        if (i === 0) {
          categoryLinks = <CategoryLinks />;
        }

        let content = (
          <Fragment key={i}>
            <div
              className={`sectionBg ${
                this.state.homeGames.length - 1 === i ? "bottomSpace" : ""
              }`}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 px-2 px-sm-3">{categoryLinks}</div>
                </div>
                <div className="row align-items-center py-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <CategoryIcon name={games.name} />
                      <h3 className="ml-2 text-capitalize mb-0 gameName">
                        {games.name}
                      </h3>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <Link
                      to={`/category/${games.name}`}
                      className="d-inline-block c-pointer moreLink"
                    >
                      More
                      <FontAwesomeIcon
                        className="ml-1 rightArrow"
                        icon={faChevronRight}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <FreeGame games={games.games} category={games.name} />
            </div>
          </Fragment>
        );

        if (games.games && games.games.length === 0) {
          content = null;
        }
        return content;
      });
    }
    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <HomeCarousel />
        <TopCategory />
        {gamesContent}
        <Footer />
      </Fragment>
    );
  }
}

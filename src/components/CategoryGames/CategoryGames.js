import React, { Component, Fragment } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import axios from "../../config/axios";
import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

import "../Home/Home.css";
import GamesList from "../Common/GamesList/GamesList";
import CategoryIcon from "../../components/Home/CategoryIcon/CategoryIcon";

export default class CategoryGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      categoryGames: [],
      categoryName: "",
    };
  }

  async getCategoryGames() {
    if (
      this.props.location.pathname &&
      this.props.location.pathname.includes("category")
    ) {
      const categorySlug = this.props.location.pathname.split("/category/")[1];
      if (categorySlug) {
        const result = await axios.getRequest(
          `/api/v1/category/${categorySlug}`
        );

        if (result.success === true) {
          return result.games;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  async componentDidMount() {
    let isAdmin = false;
    let isLogin = false;
    const loginData = checkLogin();

    if (loginData.success === true) {
      isLogin = true;

      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
      }
    }

    let categoryName;
    if (this.props.location.pathname.includes("/category/")) {
      const name = this.props.location.pathname.split("/category/")[1];
      if (name) {
        categoryName = name;
      }
    }

    const categoryGames = await this.getCategoryGames();

    this.setState({
      ...this.state,
      categoryGames,
      isAdmin,
      isLogin,
      loader: false,
      categoryName,
    });
  }

  render() {
    let gamesContent = (
      <p className="my-md-5 my-4 text-center text-white">No games found!</p>
    );
    if (this.state.categoryGames && this.state.categoryGames.length) {
      gamesContent = (
        <Fragment>
          <div className="sectionBg mb-0">
            <div className="container-fluid">
              <div className="row align-items-center py-3">
                <div className="col-12">
                  <div className="d-flex align-items-center">
                    <CategoryIcon name={this.state.categoryName} />
                    <h3 className="text-capitalize mb-0 ml-2 gameName">
                      {this.state.categoryName} Games
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <GamesList type="flex-wrap" games={this.state.categoryGames} />
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        {gamesContent}
      </Fragment>
    );
  }
}

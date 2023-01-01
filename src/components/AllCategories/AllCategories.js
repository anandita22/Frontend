import React, { Component, Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import CategoryGamesList from "../AllCategories/CategoryGamesList/CategoryGamesList";

import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

import "../Common/FreeGame/FreeGame.css";

export default class AllCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      games: [
        {
          name: "Action",
          slug: "action",
          image:
            "https://api.c2gamesstudio.com/assets/images/1605542352701_Vax.png",
        },
        {
          name: "Casual",
          slug: "casual",
          image:
            "https://api.c2gamesstudio.com/assets/images/1599671278900_WhatsApp%20Image%202020-09-09%20at%207.01.45%20PM.jpeg",
        },
        {
          name: "Strategy",
          slug: "strategy",
          image:
            "https://api.c2gamesstudio.com/assets/images/1599674323168_4.png",
        },
        {
          name: "Puzzle",
          slug: "puzzle",
          image:
            "https://api.c2gamesstudio.com/assets/images/1599676942830_9.png",
        },
        {
          name: "Board",
          slug: "board",
          image:
            "https://api.c2gamesstudio.com/assets/images/1605621627418_Ludo.png",
        },
      ],
    };
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

    this.setState({
      ...this.state,
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
                All Categories
              </h1>
            </div>
          </div>
        </div>
        <CategoryGamesList games={this.state.games} />
        <Footer />
      </Fragment>
    );
  }
}

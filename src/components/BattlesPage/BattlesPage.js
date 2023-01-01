import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

export default class BattlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      allTournaments: [],
    };
    ReactGA.initialize(constants.analyticId);
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
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="text-white">Comming Soon</h2>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

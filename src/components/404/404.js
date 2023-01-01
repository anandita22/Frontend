import React, { Fragment, Component } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import { checkLogin } from "../../utils/utils";

import constants from "../../config/constants";

import NotFoundImage from "../../assets/images/404-icon.png";

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
    };
  }

  async componentDidMount() {
    document.title = "Page not found";
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
        <div className="container">
          <div className="row">
            <div className="col-12 text-center my-4">
              <img
                src={NotFoundImage}
                alt="Page not found"
                className="img-fluid mb-3"
                style={{
                  maxWidth: "150px",
                }}
              />
              <h4 className="text-white">Page Not Found</h4>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

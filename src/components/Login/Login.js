import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import validator from "validator";
import { Form, Button } from "react-bootstrap";
import axios from "../../config/axios";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsgs: [],
      loginDetails: {
        email: "",
        password: "",
      },
      disabledLogin: false,
      loader: false,
      isAdmin: false,
      isLogin: false,
    };
    ReactGA.initialize(constants.analyticId);
  }

  onFieldChange(field, event) {
    const loginDetails = { ...this.state.loginDetails };
    loginDetails[field] = event.target.value;
    this.setState({ ...this.state, loginDetails, isError: false });
  }

  validateDetails(details) {
    const errors = [];

    if (!(details.email && details.email.length)) {
      errors.push("Please enter your email");
    } else {
      if (!validator.isEmail(details.email)) {
        errors.push("Please enter valid email address");
      }
    }

    if (!(details.password && details.password.length)) {
      errors.push("Please enter password");
    } else {
      if (details.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
      }
    }

    return errors;
  }

  async onLogin() {
    const errors = this.validateDetails(this.state.loginDetails);
    if (errors.length) {
      this.setState({ ...this.state, isError: true, errMsgs: errors });
      return;
    }

    const result = await axios.postRequest(
      "/api/v1/auth/login",
      this.state.loginDetails
    );

    if (result.success === true) {
      localStorage.setItem("token", result.token);
      window.location.assign("/");
    } else {
      this.setState({ ...this.state, isError: true, errMsgs: [result.msg] });
    }
  }

  isLoggedIn() {
    const loginData = checkLogin();
    if (loginData.success === true) {
      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        window.location.assign("/admin/games");
      } else {
        window.location.assign("/profile");
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname);
    }, 1000);
    this.isLoggedIn();
  }

  render() {
    let errorStrip =
      this.state.isError === true ? (
        <Form.Group>
          <ul className="mb-0">
            {this.state.errMsgs.map((msg, i) => (
              <li key={i}>
                <p className="mb-0 text-white">{msg}</p>
              </li>
            ))}
          </ul>
        </Form.Group>
      ) : null;
    return (
      <Fragment>
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <div className="container-fluid my-md-5 my-3">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 col-12">
              <div className="loginSignupWrapper rounded px-md-5 px-3 py-md-5 py-4">
                <div className="row">
                  <div className="col-lg-4">
                    <h3 className="mb-3 mb-lg-0 loginSignupHeading text-white">
                      Login into your account
                    </h3>
                  </div>
                  <div className="col-lg-8">
                    <Form noValidate>
                      <Form.Group>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={(event) =>
                            this.onFieldChange("email", event)
                          }
                          value={this.state.loginDetails.email}
                          className="input px-3 py-3 rounded border-0"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(event) =>
                            this.onFieldChange("password", event)
                          }
                          value={this.state.loginDetails.password}
                          className="input px-3 py-3 rounded border-0"
                        />
                      </Form.Group>
                      {errorStrip}
                      <Form.Group className="mb-0">
                        <Button
                          disabled={this.state.disabledLogin}
                          className="themeBtn px-4 py-2"
                          type="button"
                          onClick={this.onLogin.bind(this)}
                        >
                          <FontAwesomeIcon className="mr-2" icon={faUser} />
                          Login
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

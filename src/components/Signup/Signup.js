import React, { Component, Fragment } from "react";
import validator from "validator";
import { Form, Button } from "react-bootstrap";
import axios from "../../config/axios";
import { parseErrorMsg } from "../../utils/utils";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errMsgs: [],
      signupDetails: {
        name: "",
        email: "",
        password: "",
      },
      infoMsg: "",
      disabledSignup: false,
      isAdmin: false,
      isLogin: false,
    };
  }

  onFieldChange(field, event) {
    const signupDetails = { ...this.state.signupDetails };
    signupDetails[field] = event.target.value;
    this.setState({ ...this.state, signupDetails, isError: false });
  }

  validateDetails(details) {
    const errors = [];

    if (!(details.name && details.name.length)) {
      errors.push("Please enter your name");
    }

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

  async onSingup() {
    const errors = this.validateDetails(this.state.signupDetails);
    if (errors.length) {
      this.setState({ ...this.state, isError: true, errMsgs: errors });
      return;
    }

    this.setState({ ...this.state, disabledSignup: true });

    const data = await axios.postRequest(
      "/api/v1/user",
      this.state.signupDetails
    );

    if (data.success === true) {
      this.setState({
        ...this.state,
        infoMsg: "Account created!",
        isError: false,
        errMsgs: [],
        signupDetails: {
          name: "",
          email: "",
          password: "",
        },
        disabledSignup: false,
      });
    } else {
      const msgs = parseErrorMsg(data.errors);
      this.setState({
        ...this.state,
        infoMsg: "",
        isError: true,
        errMsgs: msgs,
        disabledSignup: false,
      });
    }
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

    let infoMsg =
      this.state.infoMsg && this.state.infoMsg.length ? (
        <p className="infoMsg text-white">{this.state.infoMsg}</p>
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
                      Create a new account
                    </h3>
                  </div>
                  <div className="col-lg-8">
                    <Form noValidate>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={(event) =>
                            this.onFieldChange("name", event)
                          }
                          value={this.state.signupDetails.name}
                          className="input px-3 py-3 rounded border-0"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={(event) =>
                            this.onFieldChange("email", event)
                          }
                          value={this.state.signupDetails.email}
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
                          value={this.state.signupDetails.password}
                          className="input px-3 py-3 rounded border-0"
                        />
                      </Form.Group>
                      {errorStrip}
                      {infoMsg}
                      <Form.Group className="mb-0">
                        <Button
                          disabled={this.state.disabledSignup}
                          className="themeBtn px-4 py-2"
                          type="button"
                          onClick={this.onSingup.bind(this)}
                        >
                          <FontAwesomeIcon className="mr-2" icon={faUser} />
                          Signup
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

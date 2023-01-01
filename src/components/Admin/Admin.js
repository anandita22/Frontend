import React, { Component, Fragment } from "react";
import ReactGA from "react-ga";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import CustomButton from "../Common/Button_1";
import Categories from "./Categories/Categories";
import AddGame from "./Game/AddGame/AddGame";
import GameList from "./Game/GameList/GameList";
import DeleteGame from "./Game/ConfirmDelete/ConfirmDelete";

import axios from "../../config/axios";
import { checkLogin, parseErrorMsg } from "../../utils/utils";

import constants from "../../config/constants";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      isAdmin: false,
      isLogin: false,
      showCategories: false,
      showConfirm: false,
      categories: [],
      deleteCategoryId: "",
      categoryDetails: {
        name: "",
        slug: "",
      },
      isCategoryError: false,
      categoryErrorMsgs: [],

      showGameModal: false,
      gameModalTitle: "Add Game",
      isNewGame: true,
      gameDetails: {
        _id: "",
        name: "",
        slug: "",
        category: "",
        leaderboard: "",
        iframeURL: "",
        priority: 0,
        hidden: "",
      },
      isGameError: false,
      gameErrorMsgs: [],
      isGameCTADisabled: false,
      gameInfoMsg: "",
      gameImageText: "Select Game Image",
      gameZipText: "Select Game Zip",
      editGameId: "",
      games: [],

      isDeleteGame: false,
      deleteGameId: "",
    };

    ReactGA.initialize(constants.analyticId);
  }

  onCategoryFieldChange(field, event) {
    const details = { ...this.state.categoryDetails };
    details[field] = event.target.value;
    this.setState({
      ...this.state,
      categoryDetails: details,
      isCategoryError: false,
    });
  }

  validateCategoryDetails(details) {
    const errors = [];

    if (!(details.name && details.name.length)) {
      errors.push("Please enter category name!");
    }

    if (!(details.slug && details.slug.length)) {
      errors.push("Please enter category slug!");
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

  openCategories() {
    this.setState({ ...this.state, showCategories: true, showConfirm: false });
  }

  isLoggedIn() {
    let isAdmin = false;
    let isLogin = false;

    const loginData = checkLogin();
    if (loginData.success === true) {
      isLogin = true;
      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
        this.setState({ ...this.state, isAdmin, isLogin });
        this.getAdminData();
      } else {
        window.location.assign("/profile");
      }
    } else {
      window.location.assign("/login");
      return;
    }
  }

  onConfirmDelete(id) {
    this.setState({
      ...this.state,
      showCategories: false,
      showConfirm: true,
      deleteCategoryId: id,
    });
  }

  onHideConfirm() {
    this.setState({
      ...this.state,
      showCategories: true,
      showConfirm: false,
      deleteCategoryId: "",
    });
  }

  async onDeleteCategory() {
    const id = this.state.deleteCategoryId;
    if (id) {
      const result = await axios.deleteRequest(`/api/v1/category/${id}`, null);
      console.log("onDeleteCategory >> result >> ", result);
      if (result.success === true) {
        const categories = [...this.state.categories];
        const index = categories.findIndex((category) => category._id === id);
        if (index > -1) {
          categories.splice(index, 1);

          this.setState({
            ...this.state,
            categories,
            showCategories: true,
            showConfirm: false,
            deleteCategoryId: "",
          });
        }
      }
    }
  }

  async onAddCategory() {
    const errors = this.validateCategoryDetails(this.state.categoryDetails);
    if (errors && errors.length) {
      this.setState({
        ...this.state,
        isCategoryError: true,
        categoryErrorMsgs: errors,
      });
      return;
    }

    const result = await axios.postRequest(
      "/api/v1/category",
      this.state.categoryDetails
    );

    if (result.success === true) {
      const categories = [...this.state.categories];
      categories.push(result.data);
      this.setState({
        ...this.state,
        isCategoryError: false,
        categoryErrorMsgs: [],
        categories,
        categoryDetails: {
          name: "",
          slug: "",
        },
      });
    } else {
      const msgs = parseErrorMsg(result.errors);
      this.setState({
        ...this.state,
        isCategoryError: true,
        categoryErrorMsgs: msgs,
      });
    }
  }

  onCategoriesClose() {
    this.setState({
      ...this.state,
      showCategories: false,
      isCategoryError: false,
      categoryErrorMsgs: [],
      categoryDetails: {
        name: "",
        slug: "",
      },
    });
  }

  openGameModal(title, shouldOpen, details) {
    let isNew = true;
    let gameDetails = {
      name: "",
      slug: "",
      category: "",
      leaderboard: "",
      _id: "",
      iframeURL: "",
      priority: 0,
      hidden: "",
    };

    if (details) {
      gameDetails = details;
      isNew = false;
    }

    this.setState({
      ...this.state,
      showGameModal: shouldOpen,
      gameModalTitle: title,
      gameDetails,
      isNew,
    });
  }

  closeGameModal() {
    this.setState({
      ...this.state,
      showGameModal: false,
      gameInfoMsg: "",
      gameDetails: {
        name: "",
        slug: "",
        category: "",
        leaderboard: "",
        _id: "",
        iframeURL: "",
        priority: 0,
        hidden: "",
      },
      isGameError: false,
      gameErrorMsgs: [],
      isGameCTADisabled: false,
      gameImageText: "Select Game Image",
      gameZipText: "Select Game Zip",
      editGameId: "",
    });

    const image = document.querySelector("#image");
    const game_zip = document.querySelector("#game_zip");

    if (image) {
      image.value = "";
    }

    if (game_zip) {
      game_zip.value = "";
    }
  }

  onGameFieldChange(field, event) {
    const details = { ...this.state.gameDetails };
    details[field] = event.target.value;
    this.setState({
      ...this.state,
      gameDetails: details,
    });
  }

  onFileChange(field, event) {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].name
    ) {
      this.setState({ ...this.state, [field]: event.target.files[0].name });
    }
  }

  validateGameDetails(isNew, details) {
    const errors = [];

    if (!(details.name && details.name.length)) {
      errors.push("Please enter game name!");
    }

    if (!(details.slug && details.slug.length)) {
      errors.push("Please enter game slug!");
    }

    if (!(details.category && details.category.length)) {
      errors.push("Please select game category!");
    }

    if (details.iframeURL) {
      if (!details.iframeURL.includes("http")) {
        errors.push("Please enter valid Iframe URL!");
      }
    } else {
      if (isNew) {
        const gameImage = document.querySelector("#image");
        const gameZip = document.querySelector("#game_zip");

        if (gameImage && gameImage.value === "") {
          errors.push("Please select game image!");
        }

        if (gameZip && gameZip.value === "") {
          errors.push("Please select game zip or Iframe URL is required!");
        }
      } else {
        const gameZip = document.querySelector("#game_zip");

        if (gameZip && gameZip.value === "") {
          errors.push("Please select game zip or Iframe URL is required!");
        }
      }
    }

    return errors;
  }

  async onAddGame() {
    const errors = this.validateGameDetails(
      this.state.isNewGame,
      this.state.gameDetails
    );

    if (errors && errors.length) {
      this.setState({
        ...this.state,
        isGameError: true,
        gameErrorMsgs: errors,
      });
    } else {
      this.setState({
        ...this.state,
        isGameError: false,
        gameErrorMsgs: [],
        isGameCTADisabled: true,
      });

      const formData = new FormData();
      for (let i in this.state.gameDetails) {
        formData.append(i, this.state.gameDetails[i]);
      }
      formData.append("image", document.querySelector("#image").files[0]);
      formData.append("game_zip", document.querySelector("#game_zip").files[0]);

      const result = await axios.formDataRequest(
        "/api/v1/game",
        "post",
        formData
      );

      if (result.success === true) {
        const games = [...this.state.games];
        games.push(result.game);
        this.setState({
          ...this.state,
          gameInfoMsg: result.msg,
          gameDetails: {
            name: "",
            slug: "",
            category: "",
            leaderboard: "",
            _id: "",
            iframeURL: "",
            priority: 0,
            hidden: "",
          },
          isGameError: false,
          gameErrorMsgs: [],
          isGameCTADisabled: false,
          gameImageText: "Select Game Image",
          gameZipText: "Select Game Zip",
          games,
        });
      } else {
        const msgs = parseErrorMsg(result.errors);
        this.setState({
          ...this.state,
          gameInfoMsg: "",
          isGameError: true,
          gameErrorMsgs: msgs,
          isGameCTADisabled: false,
        });
      }
    }
  }

  async onEditButton(id, slug) {
    const result = await axios.getRequest(`/api/v1/game/${slug}`);
    if (result.success === true) {
      const gameDetails = {
        _id: result.game._id,
        name: result.game.name,
        slug: result.game.slug,
        category: result.game.category,
        leaderboard: result.game.leaderboard,
        priority: result.game.priority,
        hidden: result.game.hidden === true ? true : false,
      };

      if (result.game.iframeURL) {
        gameDetails.iframeURL = result.game.iframeURL;
      } else {
        gameDetails.iframeURL = result.game.URL;
      }
      this.setState({
        ...this.state,
        gameDetails,
        showGameModal: true,
        gameModalTitle: `Update - ${result.game.name}`,
        isNewGame: false,
        editGameId: id,
      });
    }
  }

  async onEditGame() {
    const errors = this.validateGameDetails(
      this.state.isNewGame,
      this.state.gameDetails
    );

    if (errors && errors.length) {
      this.setState({
        ...this.state,
        isGameError: true,
        gameErrorMsgs: errors,
      });
    } else {
      this.setState({
        ...this.state,
        isGameError: false,
        gameErrorMsgs: [],
        isGameCTADisabled: true,
      });

      const formData = new FormData();
      for (let i in this.state.gameDetails) {
        formData.append(i, this.state.gameDetails[i]);
      }
      if (document.querySelector("#image").files[0]) {
        formData.append("image", document.querySelector("#image").files[0]);
      }

      if (document.querySelector("#game_zip").files[0]) {
        formData.append(
          "game_zip",
          document.querySelector("#game_zip").files[0]
        );
      }

      const result = await axios.formDataRequest(
        `/api/v1/game/${this.state.editGameId}`,
        "patch",
        formData
      );

      if (result.success === true) {
        const games = [...this.state.games];
        const index = games.findIndex((game) => game._id === result.game._id);
        if (index > -1) {
          games[index] = result.game;
        }
        this.setState({
          ...this.state,
          gameInfoMsg: "Game updated!",
          isGameError: false,
          gameErrorMsgs: [],
          isGameCTADisabled: false,
          gameImageText: "Select Game Image",
          gameZipText: "Select Game Zip",
          games,
        });
      } else {
        const msgs = parseErrorMsg(result.errors);
        this.setState({
          ...this.state,
          gameInfoMsg: "",
          isGameError: true,
          gameErrorMsgs: msgs,
          isGameCTADisabled: false,
        });
      }
    }
  }

  showDeletGameConfirm(id) {
    this.setState({ ...this.state, isDeleteGame: true, deleteGameId: id });
  }

  cancelDeletGameConfirm() {
    this.setState({ ...this.state, isDeleteGame: false, deleteGameId: "" });
  }

  async onDeletGame() {
    const result = await axios.deleteRequest(
      `/api/v1/game/${this.state.deleteGameId}`,
      null
    );
    if (result.success === true) {
      const games = [...this.state.games];
      const index = games.findIndex(
        (game) => game._id === this.state.deleteGameId
      );
      if (index > -1) {
        games.splice(index, 1);
        this.setState({
          ...this.state,
          games,
          isDeleteGame: false,
          deleteGameId: "",
        });
      }
    } else {
      this.cancelDeletGameConfirm();
    }
  }

  async getAdminData() {
    try {
      const pr1 = axios.getRequest("/api/v1/category");
      const pr2 = axios.getRequest("/api/v1/game/admin");

      const data = await Promise.all([pr1, pr2]);

      let categories = [];
      let games = [];

      if (data[0] && data[0].success === true) {
        categories = data[0].data;
      }

      if (data[1] && data[1].success === true) {
        games = data[1].data;
      }

      this.setState({
        ...this.state,
        categories,
        games,
        loader: false,
        isAdmin: true,
        isLogin: true,
      });
    } catch (err) {}
  }

  componentDidMount() {
    setTimeout(() => {
      ReactGA.pageview(window.location.pathname);
    }, 1000);
    this.isLoggedIn();
  }

  render() {
    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <div className="container my-lg-5 my-sm-4 my-3 py-sm-4 py-3 px-sm-4 px-3 loginSignupWrapper rounded">
          <div className="row mb-lg-4 mb-3">
            <div className="col-12">
              <h3 className="mb-0 text-white">Admin - Games</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-6 mb-3 mb-sm-0">
              <CustomButton
                click={this.openCategories.bind(this)}
                text="Categories"
                isDisabled={false}
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-6">
              <CustomButton
                click={() => this.openGameModal("Add Game", true, null)}
                text="Add Game"
                isDisabled={false}
              />
            </div>
          </div>
        </div>
        <div className="container my-lg-5 my-sm-4 my-3 py-sm-4 py-3 px-sm-4 px-3 loginSignupWrapper rounded">
          <div className="row mb-lg-4 mb-3">
            <div className="col-12">
              <h3 className="mb-0 text-white">Games List</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <GameList
                games={this.state.games}
                onEditButton={this.onEditButton.bind(this)}
                showDeletGameConfirm={this.showDeletGameConfirm.bind(this)}
              />
            </div>
          </div>
        </div>
        <Categories
          onAddCategory={this.onAddCategory.bind(this)}
          categoryErrorMsgs={this.state.categoryErrorMsgs}
          isCategoryError={this.state.isCategoryError}
          categoryDetails={this.state.categoryDetails}
          onFieldChange={this.onCategoryFieldChange.bind(this)}
          hideConfirm={this.onHideConfirm.bind(this)}
          confirmDelete={this.onConfirmDelete.bind(this)}
          deleteCategory={this.onDeleteCategory.bind(this)}
          categories={this.state.categories}
          show={this.state.showCategories}
          showConfirm={this.state.showConfirm}
          onClose={this.onCategoriesClose.bind(this)}
        />
        <AddGame
          categories={this.state.categories}
          showGameModal={this.state.showGameModal}
          gameDetails={this.state.gameDetails}
          gameModalTitle={this.state.gameModalTitle}
          onGameFieldChange={this.onGameFieldChange.bind(this)}
          gameImageText={this.state.gameImageText}
          gameZipText={this.state.gameZipText}
          onFileChange={this.onFileChange.bind(this)}
          onAddGame={this.onAddGame.bind(this)}
          isGameError={this.state.isGameError}
          gameErrorMsgs={this.state.gameErrorMsgs}
          isGameCTADisabled={this.state.isGameCTADisabled}
          gameInfoMsg={this.state.gameInfoMsg}
          closeGameModal={this.closeGameModal.bind(this)}
          onEditGame={this.onEditGame.bind(this)}
        />
        <DeleteGame
          isDeleteGame={this.state.isDeleteGame}
          cancelDeletGameConfirm={this.cancelDeletGameConfirm.bind(this)}
          onDeletGame={this.onDeletGame.bind(this)}
        />
      </Fragment>
    );
  }
}

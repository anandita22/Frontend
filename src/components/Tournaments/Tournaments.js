import React, { Component, Fragment } from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import CustomButton from "../Common/Button_1";
import TournamentList from "./TournamentList/TournamentList";
import AddTournament from "./AddTournament/AddTournament";
import DeleteTournament from "./DeleteTournament/DeleteTournament";

import axios from "../../config/axios";
import { formatDate, checkLogin } from "../../utils/utils";
import constants from "../../config/constants";

export default class Tournaments extends Component {
  state = {
    isAdmin: false,
    isLogin: false,
    allTournaments: [],
    tournamentData: {
      game: "",
      endDate: "",
      prizes: [
        {
          position: "1",
          prize: "",
        },
        {
          position: "2",
          prize: "",
        },
        {
          position: "3",
          prize: "",
        },
      ],
      maxScorePerMinute: "",
      status: "",
    },
    showAddTournament: false,
    isAddTournamentDisabled: false,
    addTournamentError: false,
    tournamentFormErrors: [],
    addTournamentResMsg: "",
    isNewTournament: true,
    editTournamentId: "",
    editTournamentIndex: -1,
    tournamentModalTitle: "Add Tournament",
    tournamentCTA_ButtonText: "Add",
    showDeleteTournament: false,
    deleteTournamentId: "",
    deleteTournamentIndex: -1,
  };

  onTournamentFieldChange(field, event) {
    const details = { ...this.state.tournamentData };
    if (field === "endDate") {
      details.endDate = new Date(event).getTime();
    } else {
      details[field] = event.target.value;
    }
    this.setState({
      ...this.state,
      tournamentData: details,
    });
    if (details.endDate) {
      this.updateEndTime(formatDate(details.endDate));
    }
  }

  onPrizeFieldChange(index, type, event) {
    const tournamentData = { ...this.state.tournamentData };
    tournamentData.prizes[index][type] = event.target.value;

    this.setState({
      ...this.state,
      tournamentData,
    });

    if (tournamentData.endDate) {
      this.updateEndTime(formatDate(tournamentData.endDate));
    }
  }

  toggleAddTournament(isOpen) {
    let state = {
      ...this.state,
      showAddTournament: isOpen,
      isNewTournament: true,
      editTournamentId: "",
      editTournamentIndex: -1,
      addTournamentResMsg: "",
      tournamentModalTitle: "Add Tournament",
      tournamentCTA_ButtonText: "Add",
    };
    if (isOpen === false) {
      state.tournamentData = {
        game: "",
        endDate: new Date(),
        prizes: [
          {
            position: "1",
            prize: "",
          },
          {
            position: "2",
            prize: "",
          },
          {
            position: "3",
            prize: "",
          },
        ],
        maxScorePerMinute: "",
      };
    }
    this.setState(state);
  }

  addPrize() {
    const tournamentData = { ...this.state.tournamentData };
    tournamentData.prizes.push({
      position: "",
      prize: "",
    });
    this.setState({ ...this.state, tournamentData });

    if (tournamentData.endDate) {
      this.updateEndTime(formatDate(tournamentData.endDate));
    }
  }

  removePrize(index) {
    const tournamentData = { ...this.state.tournamentData };
    tournamentData.prizes.splice(index, 1);

    this.setState({ ...this.state, tournamentData });
    if (tournamentData.endDate) {
      this.updateEndTime(formatDate(tournamentData.endDate));
    }
  }

  validateTournamentData(tournamentData) {
    const err = [];
    if (tournamentData && !tournamentData.game) {
      err.push("Please enter game id");
    }

    if (tournamentData && !tournamentData.endDate) {
      err.push("Please select end date");
    }

    if (
      tournamentData &&
      tournamentData.prizes &&
      tournamentData.prizes.length
    ) {
      let valid = true;
      tournamentData.prizes.forEach((prize) => {
        if (!prize.position || !prize.prize) {
          valid = false;
        }
      });
      if (valid === false)
        err.push("Please enter valid position and prize amount");
    }

    if (tournamentData && !tournamentData.status) {
      err.push("Please select tournament status");
    }

    if (tournamentData && !tournamentData.maxScorePerMinute) {
      err.push("Please enter max score");
    }

    return err;
  }

  onTournamentCTA() {
    if (this.state.isNewTournament === true) {
      this.onAddTournament();
    } else {
      this.onUpdateTournament();
    }
  }

  updateEndTime(time) {
    setTimeout(() => {
      const tournamentEndTime = document.querySelector("#tournamentEndTime");
      if (tournamentEndTime) {
        tournamentEndTime.value = time;
      }
    }, 10);
  }

  async onAddTournament() {
    try {
      const errors = this.validateTournamentData(this.state.tournamentData);
      if (errors && errors.length > 0) {
        this.setState({
          ...this.state,
          addTournamentError: true,
          tournamentFormErrors: errors,
        });
        return;
      }

      this.setState({
        ...this.status,
        isAddTournamentDisabled: true,
        addTournamentError: false,
      });

      const tourniData = { ...this.state.tournamentData };
      tourniData.maxScorePerMinute = parseInt(tourniData.maxScorePerMinute);
      tourniData.prizes = tourniData.prizes.map((prize) => {
        return {
          position: prize.position,
          prize: parseInt(prize.prize),
        };
      });

      const result = await axios.postRequest("/api/v1/tournament", tourniData, {
        headers: { authorization: localStorage.getItem("token") },
      });

      if (result && result.success === false) {
        this.setState({
          ...this.state,
          addTournamentError: true,
          isAddTournamentDisabled: false,
          tournamentFormErrors: [result.msg],
        });
        return;
      }

      const allTournaments = [...this.state.allTournaments];
      allTournaments.push(result.data);

      this.setState({
        ...this.state,
        addTournamentError: false,
        isAddTournamentDisabled: false,
        tournamentFormErrors: [],
        allTournaments,
        addTournamentResMsg: "Tournament added!",
        tournamentData: {
          game: "",
          endDate: "",
          prizes: [
            {
              position: "1",
              prize: "",
            },
            {
              position: "2",
              prize: "",
            },
            {
              position: "3",
              prize: "",
            },
          ],
          maxScorePerMinute: "",
          status: "",
        },
      });

      this.updateEndTime("");
    } catch (err) {
      console.log(err);
    }
  }

  async onUpdateTournament() {
    try {
      const errors = this.validateTournamentData(this.state.tournamentData);
      if (errors && errors.length > 0) {
        this.setState({
          ...this.state,
          addTournamentError: true,
          tournamentFormErrors: errors,
        });
        return;
      }

      this.setState({
        ...this.status,
        isAddTournamentDisabled: true,
        addTournamentError: false,
      });

      const tourniData = { ...this.state.tournamentData };
      tourniData.maxScorePerMinute = parseInt(tourniData.maxScorePerMinute);
      tourniData.endDate = new Date(tourniData.endDate).getTime();
      tourniData.prizes = tourniData.prizes.map((prize) => {
        return {
          position: prize.position,
          prize: parseInt(prize.prize),
        };
      });

      console.log("tourniData >> ", tourniData);

      const result = await axios.patchRequest(
        `/api/v1/tournament/${this.state.editTournamentId}`,
        tourniData,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );

      if (result && result.success === false) {
        this.setState({
          ...this.state,
          addTournamentError: true,
          isAddTournamentDisabled: false,
          tournamentFormErrors: [result.msg],
        });
        return;
      }

      const tournaments = [...this.state.allTournaments];
      tournaments[this.state.editTournamentIndex] = result.data;

      this.setState({
        ...this.state,
        addTournamentError: false,
        isAddTournamentDisabled: false,
        tournamentFormErrors: [],
        addTournamentResMsg: "Tournament updated!",
        allTournaments: tournaments,
      });

      this.updateEndTime(formatDate(tourniData.endDate));
    } catch (err) {
      console.log(err);
    }
  }

  async getTournaments() {
    const isLogin = this.isLoggedIn();
    if (isLogin.isLogin === true) {
      if (isLogin.isAdmin === true) {
        const result = await axios.getRequest("/api/v1/tournament");
        if (result.success === true) {
          this.setState({
            ...this.state,
            allTournaments: [
              ...result.data.live,
              ...result.data.ended,
              ...result.data.over,
            ],
            isLogin: true,
            isAdmin: true
          });
        }
      } else {
        window.location.assign("/profile");
      }
    } else {
      window.location.assign("/login");
    }
  }

  async onEditTournament(tournamentId, index) {
    const result = await axios.getRequest(`/api/v1/tournament/${tournamentId}`);
    if (result.success === true) {
      this.setState({
        ...this.state,
        tournamentData: {
          game: result.data.game._id,
          endDate: result.data.endDate,
          prizes: result.data.prizes,
          maxScorePerMinute: result.data.maxScorePerMinute,
          status: result.data.status,
        },
        showAddTournament: true,
        isNewTournament: false,
        editTournamentId: result.data._id,
        editTournamentIndex: index,
        addTournamentResMsg: "",
        addTournamentError: false,
        tournamentFormErrors: [],
        tournamentModalTitle: "Edit Tournament",
        tournamentCTA_ButtonText: "Update",
      });

      this.updateEndTime(formatDate(result.data.endDate));
    }
  }

  toggleDeletePopup(isOpen) {
    const state = { ...this.state };
    state.showDeleteTournament = isOpen;

    if (isOpen === false) {
      state.deleteTournamentId = "";
      state.deleteTournamentIndex = -1;
    }

    this.setState(state);
  }

  confirmDeleteTournament(tournamentId, index) {
    this.setState({
      ...this.state,
      deleteTournamentId: tournamentId,
      deleteTournamentIndex: index,
      showDeleteTournament: true,
    });
  }

  async onDeleteTournament() {
    if (this.state.deleteTournamentIndex > -1) {
      const result = await axios.deleteRequest(
        `/api/v1/tournament/${this.state.deleteTournamentId}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );

      if (result && result.success === true) {
        const tournaments = [...this.state.allTournaments];
        tournaments.splice(this.state.deleteTournamentIndex, 1);

        this.setState({
          ...this.state,
          allTournaments: tournaments,
          showDeleteTournament: false,
        });
      }
    }
  }

  isLoggedIn() {
    let isAdmin = false;
    let isLogin = false;

    const loginData = checkLogin();
    if (loginData.success === true) {
      isLogin = true;
      if (loginData.data.role === constants.USER_ROLES.ADMIN) {
        isAdmin = true;
      }
    } else {
      window.location.assign("/login");
      return;
    }

    return { isAdmin, isLogin };
  }

  componentDidMount() {
    this.getTournaments();
  }

  render() {
    return (
      <Fragment>
        <Loader show={this.state.loader} />
        <Header isAdmin={this.state.isAdmin} isLogin={this.state.isLogin} />
        <div className="container my-lg-5 my-sm-4 my-3 py-sm-4 py-3 px-sm-4 px-3 loginSignupWrapper rounded">
          <div className="row mb-lg-4 mb-3">
            <div className="col-12">
              <h3 className="mb-0 text-white">Admin - Tournaments</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-6 mb-3 mb-sm-0">
              <CustomButton
                click={() => this.toggleAddTournament(true)}
                text="Add New"
                isDisabled={false}
              />
            </div>
          </div>
        </div>
        <div className="container my-lg-5 my-sm-4 my-3 py-sm-4 py-3 px-sm-4 px-3 loginSignupWrapper rounded">
          <div className="row mb-lg-4 mb-3">
            <div className="col-12">
              <h3 className="mb-0 text-white">Tournaments List</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <TournamentList 
                tournaments={this.state.allTournaments}
                onEditTournament={this.onEditTournament.bind(this)}
                confirmDeleteTournament={this.confirmDeleteTournament.bind(
                  this
                )}
              />
            </div>
          </div>
        </div>
        <AddTournament
          tournamentData={this.state.tournamentData}
          showAddTournament={this.state.showAddTournament}
          toggleAddTournament={this.toggleAddTournament.bind(this)}
          onTournamentFieldChange={this.onTournamentFieldChange.bind(this)}
          onPrizeFieldChange={this.onPrizeFieldChange.bind(this)}
          addPrize={this.addPrize.bind(this)}
          removePrize={this.removePrize.bind(this)}
          isAddTournamentDisabled={this.state.isAddTournamentDisabled}
          addTournamentError={this.state.addTournamentError}
          tournamentFormErrors={this.state.tournamentFormErrors}
          addTournamentResMsg={this.state.addTournamentResMsg}
          tournamentModalTitle={this.state.tournamentModalTitle}
          tournamentCTA_ButtonText={this.state.tournamentCTA_ButtonText}
          onTournamentCTA={this.onTournamentCTA.bind(this)}
        />

        <DeleteTournament
          showDeleteTournament={this.state.showDeleteTournament}
          toggleDeletePopup={this.toggleDeletePopup.bind(this)}
          onDeleteTournament={this.onDeleteTournament.bind(this)}
        />
      </Fragment>
    );
  }
}

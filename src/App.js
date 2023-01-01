import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Admin from "./components/Admin/Admin";
import GamePlay from "./components/GamePlay/GamePlay";
import NotFound from "./components/404/404";
import Tournaments from "./components/Tournaments/Tournaments";
import TournamentsPage from "./components/TournamentsPage/TournamentsPage";
import BattlesPage from "./components/BattlesPage/BattlesPage";
import TournamentDetails from "./components/TournamentDetails/TournamentDetails";
import CategoryGames from "./components/CategoryGames/CategoryGames";
import AllCategories from "./components/AllCategories/AllCategories";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        {/* <Route path="/login" exact component={Login}></Route> */}
        {/* <Route path="/signup" exact component={Signup}></Route> */}
        <Route path="/admin/games" exact component={Admin}></Route>
        <Route path="/admin/tournaments" exact component={Tournaments}></Route>
        <Route path="/tournaments" exact component={TournamentsPage}></Route>
        <Route path="/tournament" component={TournamentDetails}></Route>
        <Route path="/play" component={GamePlay}></Route>
        <Route path="/category" component={CategoryGames}></Route>
        <Route path="/categories" component={AllCategories}></Route>
        <Route path="/battles" exact component={BattlesPage}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

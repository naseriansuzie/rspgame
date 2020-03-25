import React from "react";
import { Route, Switch } from "react-router-dom";
import { Intro, Game } from "./pages";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <h1>가위바위보 게임</h1>
      </div>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route path="/rsp" component={Game} />
      </Switch>
    </>
  );
};

export default App;

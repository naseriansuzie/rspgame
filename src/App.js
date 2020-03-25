import React from "react";
import { Route, Switch } from "react-router-dom";
import { Intro, Game } from "./pages";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">RSP Game</div>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route path="/rsp" component={Game} />
      </Switch>
    </>
  );
};

export default App;

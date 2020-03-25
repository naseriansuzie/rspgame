import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import GameGuide from "../components/GameGuide";
import GameBoard from "../components/GameBoard";
import TotalScore from "../components/TotalScore";
import "./game.css";

@inject("setup")
@observer
class Game extends React.Component {
  render() {
    const { playerName, quit, askRestart, askQuit } = this.props.setup;

    return quit || playerName === "" ? (
      <Redirect push to="/" />
    ) : (
      <div className="game-container">
        <p className="greeting">반갑습니다 {playerName}님!</p>
        <div className="btn-container">
          <button className="game-btns" onClick={askRestart}>
            재시작
          </button>
          <button className="game-btns" onClick={askQuit}>
            그만하기
          </button>
        </div>
        <GameGuide />
        <GameBoard />
        <TotalScore />
      </div>
    );
  }
}
export default Game;

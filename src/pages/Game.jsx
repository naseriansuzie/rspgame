import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import RunGame from "../components/RunGame";
import TotalScore from "../components/TotalScore";
import "./game.css";

@inject("game")
@observer
class Game extends React.Component {
  render() {
    const { playerName, quit, askQuit, askRestart } = this.props.game;

    return quit || playerName === "" ? (
      <Redirect push to="/" />
    ) : (
      <div className="game-container">
        <div>반갑습니다 {playerName}님!</div>
        <div className="btn-container">
          <button className="game-btns" onClick={askRestart}>
            재시작
          </button>
          <button className="game-btns" onClick={askQuit}>
            그만하기
          </button>
        </div>
        <RunGame />
        <TotalScore />
      </div>
    );
  }
}
export default Game;

import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import GameGuide from "../components/GameGuide";
import GameBoard from "../components/GameBoard";
import TotalScore from "../components/TotalScore";
import "./game.css";

@inject("setup", "game")
@observer
class Game extends React.Component {
  constructor(props) {
    super();
    this.restartClickHandler = this.restartClickHandler.bind(this);
    this.quitClickHandler = this.quitClickHandler.bind(this);
  }

  restartClickHandler() {
    if(window.confirm(`1세트부터 재시작합니다. 재시작하시겠습니까?`)) {
      this.props.setup.makeRestart();
    }
  }

  quitClickHandler() {
    if (
      window.confirm(
        `게임을 종료하고 초기 페이지로 이동합니다. 게임을 그만하시겠습니까?`,
      )
    ) {
      this.props.setup.makeQuit();
    }
  }

  render() {
    const { playerName, quit } = this.props.setup;
    const { isFinished } = this.props.game;

    return quit || playerName === "" ? (
      <Redirect push to="/" />
    ) : (
      <div className="game-container">
        <p className="greeting">반갑습니다 {playerName}님!</p>
        <div className="btn-container">
          <button className="game-btns" onClick={this.restartClickHandler}>
            재시작
          </button>
          <button className="game-btns" onClick={this.quitClickHandler}>
            {isFinished ? `돌아가기` : `그만하기`}
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

import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import GameGuide from "../components/GameGuide";
import GameBoard from "../components/GameBoard";
import TotalScore from "../components/TotalScore";
import "./game.css";

@inject("setup", "game")
@observer
class Game extends React.Component {
  handleRestartClick = () => {
    if(window.confirm(`1세트부터 재시작합니다. 재시작하시겠습니까?`)) {
      this.props.setup.makeRestart();
    }
  }

  handleQuitClick = () => {
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
          <button className="game-btns" onClick={this.handleRestartClick}>
            재시작
          </button>
          <button className="game-btns" onClick={this.handleQuitClick}>
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

Game.wrappedComponent.propTypes = {
  game : PropTypes.object.isRequired, 
  setup : PropTypes.object.isRequired
}

export default Game;

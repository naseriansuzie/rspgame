import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import Timer from "react-compound-timer";
import "./gameBoard.css";
import { ROCK, SCISSORS, PAPER, RSP, PLAYER, COMPUTER, AUTOWIN } from "../constant";
import HandButton from "./HandButton";

@inject("game", "setup")
@observer
class GameBoard extends Component {
  
  handleGameStartClick = () => {
    const {game, setup} = this.props;
    if (game.isFinished) {
      alert("게임이 종료되었습니다!");
    } else setup.setTimer();
  }
  
  
  handleTimeout = () => {
    const { game } = this.props;
    if(game.choseHand === false) {
      alert("5초가 지났습니다 ㅠㅠ");
      game.autoLose();
    }
  }

  renderHand = (type) => {
    switch (type) {
      case ROCK :
        return "바위";
      case SCISSORS :
        return "가위";
      case PAPER :
        return "보";
      case AUTOWIN :
        return "자동 승리";
      default :
        return "";
    }
  }

  renderRoundWinner = (rounds) => {
    let latestWinner = rounds[rounds.length - 1].winner;
    switch (latestWinner) {
      case PLAYER :
        return this.props.setup.playerName;
      case COMPUTER :
        return "컴퓨터";
      case null :
        return "무승부";
      default :
        return "";
    }
  };

  render() {
    const {
      computerHand,
      rounds,
      currentRound,
      isFinished,
    } = this.props.game;
    const {
      playerName,
      gameSet,
      currentSet,
      isTimerOn,
    } = this.props.setup;
    const hands = Object.keys(RSP);

    return (
      <>
        <div className="marginTop">
          <h2 className="h2">NOW</h2>
          <ul className="ul">
            <li className="guide">전체 게임 세트 : {gameSet}</li>
            <li className="guide">
              {currentSet}세트 {currentRound} 번째 판입니다.
            </li>
          </ul>
        </div>
        <div className="hand-container">
          <div className="two-hands">
            <div className="hands-box">
              {isTimerOn === false ? (
                <button className="start-btn" onClick={this.handleGameStartClick}>
                  게임 시작
                </button>
              ) : (
                <div>
                  <p className="description">{playerName}의 선택</p>
                  <div className="rsp-container">
                    {hands.map((hand, idx) => (
                      <HandButton key={`hand_${idx+1}`} hand={hand} renderHand={this.renderHand}/>
                    ))}
                  </div>
                  <div className="timer-container">
                    {isTimerOn ? (
                      <Timer
                        initialTime={5500}
                        direction="backward"
                        checkpoints={[{ time: 0, callback: this.handleTimeout }]}
                      >
                        <div className="seconds">
                          남은 시간 <Timer.Seconds />초
                        </div>
                      </Timer>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="hands-box">
              <p className="description">컴퓨터의 선택</p>
              <p className="description">{this.renderHand(computerHand)}</p>
            </div>
          </div>
          <div>
            {rounds.length > 0 && !isFinished ? (
              <div className="score-result">
                <div>이번 판 승자 "{this.renderRoundWinner(rounds)}"</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </>
    );
  }
}

GameBoard.wrappedComponent.propTypes = {
  game : PropTypes.object.isRequired, 
  setup : PropTypes.object.isRequired
}

export default GameBoard;

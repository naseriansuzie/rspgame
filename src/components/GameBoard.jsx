import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import Timer from "react-compound-timer";
import "./gameBoard.css";
import { ROCK, SCISSORS, PAPER, RSP, PLAYER } from "../constant";

@inject("game", "setup")
@observer
class GameBoard extends Component {
  
  handleTimerClick = () => {
    const {game, setup} = this.props;
    if (game.isFinished) {
      alert("게임이 종료되었습니다!");
    } else setup.setTimer();
  }

  handleRSPClick = (hand) => {
    const {game, setup} = this.props;
    if(setup.isTimerOn) {
      game.pickComputerHand(hand);
    } else alert("게임 시작 버튼을 눌러주세요!");
  }

  noticeTimeOut = () => {
    const { choseHand, autoLose} = this.props.game;
    if(choseHand === false) {
      alert("5초가 지났습니다 ㅠㅠ");
      autoLose();
    }
  }

  displayWinner = (rounds) => {
    let latestWinner = rounds[rounds.length - 1].winner;
    if(latestWinner === PLAYER) {
      return this.props.setup.playerName;
    } else return latestWinner;
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
                <button className="start-btn" onClick={this.handleTimerClick}>
                  게임 시작
                </button>
              ) : (
                <div>
                  <p className="description">{playerName}의 선택</p>
                  <div className="rsp-container">
                    <button className="rsp" onClick={() => this.handleRSPClick(RSP[SCISSORS])}>
                      <span role="img" aria-label="Victory Hands">
                        ✌️
                      </span>{" "}
                      {SCISSORS}
                    </button>
                    <button className="rsp" onClick={() => this.handleRSPClick(RSP[ROCK])}>
                      <span role="img" aria-label="Raised Fist">
                        ✊
                      </span>{" "}
                      {ROCK}
                    </button>
                    <button className="rsp" onClick={() => this.handleRSPClick(RSP[PAPER])}>
                      <span role="img" aria-label="Raised Back of Hand">
                        🤚
                      </span>{" "}
                      {PAPER}
                    </button>
                  </div>
                  <div className="timer-container">
                    {isTimerOn ? (
                      <Timer
                        initialTime={5500}
                        direction="backward"
                        checkpoints={[{ time: 0, callback: this.noticeTimeOut }]}
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
              <p className="description">{computerHand}</p>
            </div>
          </div>
          <div>
            {rounds.length && !isFinished ? (
              <div className="score-result">
                <div>이번 판 승자 "{this.displayWinner(rounds)}"</div>
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

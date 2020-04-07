import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Timer from "react-compound-timer";
import "./gameBoard.css";

@inject("game", "setup")
@observer
class GameBoard extends Component {
  constructor(props) {
    super();
    this.timerClickHandler = this.timerClickHandler.bind(this);
    this.rspClickHandler = this.rspClickHandler.bind(this);
    this.noticeTimeOut = this.noticeTimeOut.bind(this);
  }
  
  timerClickHandler () {
    const {game, setup} = this.props;
    if (game.isFinished) {
      alert("게임이 종료되었습니다!");
    } else setup.setTimer();
  }

  rspClickHandler (hand) {
    const {game, setup} = this.props;
    if(setup.isTimerOn) {
      game.setComputerHand(hand);
    } else alert("게임 시작 버튼을 눌러주세요!");
  }

  noticeTimeOut () {
    const { choseHand, autoLose} = this.props.game;
    if(choseHand === false) {
      alert("5초가 지났습니다 ㅠㅠ");
      autoLose();
    }
  }
  
  render() {
    const {
      computerHand,
      result,
      round,
      win,
      lose,
      draw,
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
              {currentSet}세트 {round} 번째 판입니다.
            </li>
          </ul>
        </div>
        <div className="hand-container">
          <div className="two-hands">
            <div className="hands-box">
              {isTimerOn === false ? (
                <button className="start-btn" onClick={this.timerClickHandler}>
                  게임 시작
                </button>
              ) : (
                <div>
                  <p className="description">{playerName}의 선택</p>
                  <div className="rsp-container">
                    <button className="rsp" onClick={this.rspClickHandler.bind(null, 1)}>
                      <span role="img" aria-label="Victory Hands">
                        ✌️
                      </span>{" "}
                      가위
                    </button>
                    <button className="rsp" onClick={this.rspClickHandler.bind(null, 0)}>
                      <span role="img" aria-label="Raised Fist">
                        ✊
                      </span>{" "}
                      바위
                    </button>
                    <button className="rsp" onClick={this.rspClickHandler.bind(null, -1)}>
                      <span role="img" aria-label="Raised Back of Hand">
                        🤚
                      </span>{" "}
                      보
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
            {result && !isFinished ? (
              <div className="score-result">
                <div>이번 판 결과 "{result}"</div>
                <div>
                    <ul className="ul">
                      {currentSet} 세트 = 승 : {win} | 무 : {draw} | 패 : {lose}
                    </ul>
                </div>
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
export default GameBoard;

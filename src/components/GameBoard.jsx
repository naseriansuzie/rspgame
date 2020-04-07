import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Timer from "react-compound-timer";
import "./gameBoard.css";

@inject("game", "setup")
@observer
class GameBoard extends Component {
  render() {
    const {
      setComputerHand,
      computerHand,
      result,
      round,
      win,
      lose,
      draw,
      autoLose,
      isFinished,
    } = this.props.game;
    const {
      playerName,
      gameSet,
      currentSet,
      isTimerOn,
      setTimer,
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
                <button className="start-btn" onClick={setTimer}>
                  게임 시작
                </button>
              ) : (
                <div>
                  <p className="description">{playerName}의 선택</p>
                  <div className="rsp-container">
                    <button className="rsp" onClick={() => setComputerHand(1)}>
                      <span role="img" aria-label="Victory Hands">
                        ✌️
                      </span>{" "}
                      가위
                    </button>
                    <button className="rsp" onClick={() => setComputerHand(0)}>
                      <span role="img" aria-label="Raised Fist">
                        ✊
                      </span>{" "}
                      바위
                    </button>
                    <button className="rsp" onClick={() => setComputerHand(-1)}>
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
                        checkpoints={[{ time: 0, callback: autoLose }]}
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

import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Timer from "react-compound-timer";
import "./gameBoard.css";

@inject("game", "setup")
@observer
class GameBoard extends Component {
  render() {
    const { setComputerHand, computerHand, result, autoLose } = this.props.game;
    const { playerName, isTimerOn, setTimer } = this.props.setup;

    return (
      <>
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
        <div>
          <div className="hand-container">
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
                </div>
              )}
            </div>
            <div className="hands-box">
              <p className="description">컴퓨터의 선택</p>
              <p className="description">{computerHand}</p>
            </div>
          </div>
          {result ? (
            <div className="score-result">이번 판 결과 "{result}"</div>
          ) : (
            <div />
          )}
        </div>
      </>
    );
  }
}
export default GameBoard;

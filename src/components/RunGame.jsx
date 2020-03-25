import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Timer from "react-compound-timer";
import "./rungame.css";

@inject("game", "setup")
@observer
class RunGame extends Component {
  render() {
    const { setComputerHand, computerHand, round, result } = this.props.game;
    const { gameSet, currentSet } = this.props.setup;
    console.log(round, result);
    return (
      <div className="game-board">
        <div>
          <Timer
            initialTime={10000}
            direction="backward"
            checkpoints={[{ time: 0, callback: () => console.log("end") }]}
          >
            <Timer.Seconds />초
          </Timer>
        </div>
        <div>
          <ul>
            <li>
              NOW : {currentSet}세트 {round} 번째 판
            </li>
            <li>Total Set : {gameSet}</li>
          </ul>
          <p></p>
        </div>
        <div className="hand-container">
          <div className="hands">
            <p className="description">패를 선택해주세요.</p>
            <div className="rsp-container">
              <button className="rsp" onClick={() => setComputerHand(1)}>
                가위
              </button>
              <button className="rsp" onClick={() => setComputerHand(0)}>
                바위
              </button>
              <button className="rsp" onClick={() => setComputerHand(-1)}>
                보
              </button>
            </div>
          </div>
          <div className="hands">
            <p className="description">상대방의 패입니다.</p>
            <p>{computerHand}</p>
          </div>
        </div>
        {result ? (
          <div className="score-result">이번 판 결과 - {result}</div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default RunGame;

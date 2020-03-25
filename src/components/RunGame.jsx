import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./rungame.css";

@inject("game")
@observer
class RunGame extends Component {
  render() {
    const {
      currentGameSet,
      setComputerHand,
      computerHand,
      result,
    } = this.props.game;
    return (
      <div className="game-board">
        <div>
          <p>{currentGameSet}세트</p>
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

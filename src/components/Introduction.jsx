import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import "./introduction.css";

@inject("setup")
@observer
class Introduction extends Component { 
  constructor(props) {
    super();
    this.plusClickHandler = this.plusClickHandler.bind(this);
    this.minusClickHandler = this.minusClickHandler.bind(this);
  }

  plusClickHandler () {
    this.props.setup.increaseSet();
  }

  minusClickHandler () {
    const {gameSet, decreaseSet} = this.props.setup;
    if(gameSet - 2 < 0) {
      alert("1세트 이상으로 설정해주세요.");
    } else decreaseSet();
  }

  render() {
    const {
      playerName,
      gameSet,
      setPlayerName,
      moveToGame,
    } = this.props.setup;
    return (
      <div className="intro-container">
        <div className="intro-box">
          <h2 className="h2">
            <span role="img" aria-label="Raising Hands">
              🙌
            </span>{" "}
            반갑습니다 플레이어님, 이름을 적어주세요!
          </h2>
          <input
            className="input"
            type="text"
            placeholder="플레이어 이름은?"
            value={playerName}
            onChange={setPlayerName}
          ></input>
        </div>
        <div className="intro-box">
          <h2 className="h2">
            <span role="img" aria-label="Right-Facing Fist">
              🤜
            </span>{" "}
            몇 세트를 진행하시겠습니까?
          </h2>
          <div className="game-set">
            <span className="num-of-set">{gameSet} set</span>
            <button className="plusMinus-btn" onClick={this.plusClickHandler}>
              +
            </button>
            <button className="plusMinus-btn" onClick={this.minusClickHandler}>
              -
            </button>
          </div>
        </div>
        <div className="intro-box">
          <h2 className="h2">
            <span role="img" aria-label="OK Hand">
              👌
            </span>{" "}
            게임 규칙을 읽어주세요.
          </h2>
          <ul className="ul">
            <li>1 세트는 총 3판의 게임으로 진행됩니다.</li>
            <li>3판 중 [승]이 많은 플레이어가 그 세트에서 승리합니다.</li>
            <li>절반 이상의 세트를 이긴 플레이어가 최종 승리합니다.</li>
          </ul>
          {playerName !== "" ? (
            <Link to="/rsp" onClick={moveToGame}>
              <button className="move-btn">게임 시작하기</button>
            </Link>
          ) : (
            <button
              className="move-btn"
              onClick={() => alert("player의 이름을 넣어주세요!")}
            >
              게임시작하기
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Introduction;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { MIN_GAME_SET } from "../constant";
import "./introduction.css";

@inject("setup")
@observer
class Introduction extends Component {
  handleChange = (e) => {
    const { setup } = this.props;
    const { value } = e.target;
    setup.fillPlayerName(value);
  };

  handlePlusClick = () => {
    this.props.setup.increaseSet();
  };

  handleMinusClick = () => {
    const { setup } = this.props;
    if (setup.gameSet === MIN_GAME_SET) {
      alert("1세트 이상으로 설정해주세요.");
    } else setup.decreaseSet();
  };

  handleStartClick = () => {
    const { setup } = this.props;
    setup.moveToGame();
  };

  handleAlert = () => {
    alert("플레이어 이름을 넣어주세요!");
  };

  render() {
    const { playerName, gameSet } = this.props.setup;
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
            onChange={this.handleChange}
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
            <button className="plusMinus-btn" onClick={this.handlePlusClick}>
              +
            </button>
            <button className="plusMinus-btn" onClick={this.handleMinusClick}>
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
            <Link to="/rsp" onClick={this.handleStartClick}>
              <button className="move-btn">시작하기</button>
            </Link>
          ) : (
            <button className="move-btn" onClick={this.handleAlert}>
              시작하기
            </button>
          )}
        </div>
      </div>
    );
  }
}

Introduction.wrappedComponent.propTypes = {
  setup: PropTypes.object.isRequired,
};

export default Introduction;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("setup")
@observer
class Introduction extends Component {
  render() {
    const {
      playerName,
      gameSet,
      setPlayerName,
      increaseSet,
      decreaseSet,
      moveToGame,
    } = this.props.setup;
    return (
      <>
        <div>
          <h2>반갑습니다 플레이어님!</h2>
          <p>당신의 이름을 적어주세요!</p>
          <input
            type="text"
            value={playerName}
            onChange={setPlayerName}
          ></input>
        </div>
        <div>
          <h2>게임 안내</h2>
          <ul>
            <li>몇 세트를 진행하시겠습니까?</li>
            <li>1 세트는 총 3판의 게임으로 진행됩니다.</li>
            <li>3판 중 '승'이 많은 플레이어가 그 세트에서 승리합니다.</li>
          </ul>
          <div>
            <div style={{ fontSize: 25 }}>{gameSet} set</div>
            <button onClick={increaseSet}>+</button>
            <button onClick={decreaseSet}>-</button>
          </div>
        </div>
        {playerName !== "" ? (
          <Link className="start" to="/rsp" onClick={moveToGame}>
            <button>게임 시작하기</button>
          </Link>
        ) : (
          <button onClick={() => alert("player의 이름을 넣어주세요!")}>
            게임시작하기
          </button>
        )}
      </>
    );
  }
}
export default Introduction;

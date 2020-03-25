import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject(stores => ({
  gameSet: stores.game.gameSet,
  increaseSet: stores.game.increaseSet,
  decreaseSet: stores.game.decreaseSet,
  moveToGame: stores.game.moveToGame,
}))
@observer
class Introduction extends Component {
  render() {
    const { gameSet, increaseSet, decreaseSet, moveToGame } = this.props;
    return (
      <>
        <div>
          <h2>게임 설정하기</h2>
          <ul>
            <li>몇 세트를 진행하시겠습니까?</li>
            <li>1 세트는 총 3번의 게임으로 진행됩니다.</li>
          </ul>
          <div>
            <div style={{ fontSize: 25 }}>{gameSet} set</div>
            <button onClick={increaseSet}>+</button>
            <button onClick={decreaseSet}>-</button>
          </div>
        </div>

        <Link className="start" to="/rsp" onClick={moveToGame}>
          <button>게임 시작하기</button>
        </Link>
      </>
    );
  }
}
export default Introduction;

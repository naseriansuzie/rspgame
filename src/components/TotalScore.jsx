import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("game", "setup")
@observer
class TotalScore extends Component {
  render() {
    const { round } = this.props.game;
    const { gameSet, currentSet } = this.props.setup;
    return (
      <div>
        <ul>
          <li>Total Set : {gameSet}</li>
          <li>
            NOW : {currentSet}세트 {round} 번째 판
          </li>
        </ul>
        <p></p>
      </div>
    );
  }
}
export default TotalScore;

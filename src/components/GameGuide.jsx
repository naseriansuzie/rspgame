import React, { Component } from "react";

class GameGuide extends Component {
  render() {
    return (
      <>
        <h2>
          {" "}
          <span role="img" aria-label="Folded Hands">
            🙏
          </span>{" "}
          Game Rule
        </h2>
        <ul>
          <li>'게임 시작'을 누르면 5초가 주어집니다. </li>
          <li>[가위], [바위], [보] 중 하나를 클릭해주세요.</li>
          <li>5초 안에 선택하지 않으면 컴퓨터의 승리입니다.</li>
        </ul>
      </>
    );
  }
}
export default GameGuide;

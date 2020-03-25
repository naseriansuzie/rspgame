import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "antd/dist/antd.css";
import { Table } from "antd";
import "./totalScore.css";

@inject("game", "setup")
@observer
class TotalScore extends Component {
  render() {
    const { roundResults, isFinished, finalWinner } = this.props.game;
    const { playerName, columns } = this.props.setup;
    return (
      <div className="total-score-container">
        <h2 className="h2">
          <span role="img" aria-label="Writing Hands">
            ✍️
          </span>{" "}
          누적 게임 결과
        </h2>

        <ul className="score-table ul">
          {roundResults && roundResults.length > 0 ? (
            <Table columns={columns} dataSource={roundResults} />
          ) : (
            <span />
          )}
        </ul>
        {isFinished ? (
          <h1>
            최종 승리자 :{" "}
            {finalWinner === "player"
              ? playerName
              : finalWinner === "computer"
              ? "컴퓨터"
              : "무승부"}
          </h1>
        ) : (
          <p />
        )}
      </div>
    );
  }
}
export default TotalScore;

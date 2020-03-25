import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "antd/dist/antd.css";
import { Table } from "antd";

@inject("game", "setup")
@observer
class TotalScore extends Component {
  render() {
    const { roundResults, isFinished, finalWinner } = this.props.game;
    const { playerName } = this.props.setup;
    const columns = [
      {
        title: "Set",
        dataIndex: "set",
        key: "set",
      },
      {
        title: "Winner",
        dataIndex: "winner",
        key: "winner",
        render: text => {
          if (text === "player") {
            return playerName;
          } else if (text === "computer") {
            return "컴퓨터";
          } else return "무승부";
        },
      },
      {
        title: "승",
        dataIndex: "win",
        key: "win",
      },
      {
        title: "무",
        dataIndex: "draw",
        key: "draw",
      },
      {
        title: "패",
        dataIndex: "lose",
        key: "lose",
      },
    ];
    return (
      <div style={{ marginTop: "30px" }}>
        <h2>
          {" "}
          <span role="img" aria-label="Writing Hands">
            ✍️
          </span>{" "}
          누적 게임 결과
        </h2>

        <ul style={{ marginTop: "20px" }}>
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

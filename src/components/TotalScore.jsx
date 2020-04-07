import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table } from "antd";
import "./totalScore.css";

@inject("game", "setup")
@observer
class TotalScore extends Component {
  constructor(props) {
    super();
    this.translateWinner = this.translateWinner.bind(this);
  }

  columns = [
    {
      title: "Set",
      dataIndex: "set",
      key: "set",
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
      render: text => this.translateWinner(text)
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

  translateWinner(text) {
    if (text === "player") {
      return this.props.setup.playerName;
    } else if (text === "computer") {
      return "컴퓨터";
    } else return "무승부";
  }

  render() {
    const { roundResults, isFinished, finalWinner } = this.props.game;
    const { playerName } = this.props.setup;
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
            <Table columns={this.columns} dataSource={roundResults} />
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

TotalScore.propTypes = {
  playerName : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  roundResults: PropTypes.arrayOf(PropTypes.object),
  isFinished : PropTypes.bool,
  finalWinner : PropTypes.string,
}
export default TotalScore;

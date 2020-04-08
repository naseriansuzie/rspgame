import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table } from "antd";
import "./totalScore.css";

@inject("game", "setup")
@observer
class TotalScore extends Component {

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
      render: playerNum => this.translateWinner(playerNum)
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

  translateWinner = (playerNum) => {
    if (playerNum === 0) {
      return "무승부"
    } else if (playerNum === 1) {
      return "컴퓨터";
    } else if(playerNum === 2) {
      return this.props.setup.playerName;
    }
  }

  render() {
    const { roundResults, isFinished, finalWinner } = this.props.game;
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
            최종 승리자 : {this.translateWinner(finalWinner)}
          </h1>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

TotalScore.wrappedComponent.propTypes = {
  game : PropTypes.object.isRequired, 
  setup : PropTypes.object.isRequired
}

export default TotalScore;

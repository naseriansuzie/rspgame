import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Table } from "antd";
import "./totalScore.css";
import { PLAYER } from "../constant";

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
      key: "winner"
    }
  ];

  translateWinner = (finalWinner) => {
    if (finalWinner === PLAYER) {
      return this.props.setup.playerName;
    } else return finalWinner;
  }

  render() {
    const { sets, isFinished, finalWinner } = this.props.game;
    return (
      <div className="total-score-container">
        <h2 className="h2">
          <span role="img" aria-label="Writing Hands">
            ✍️
          </span>{" "}
          누적 게임 결과
        </h2>

        <ul className="score-table ul">
          {sets && sets.length > 0 ? (
            <Table columns={this.columns} dataSource={sets} />
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

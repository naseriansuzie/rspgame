import React from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import RunGame from "../components/RunGame";
import TotalScore from "../components/TotalScore";

@inject(store => ({
  gameSet: store.game.gameSet,
  currentGameSet: store.game.currentGameSet,
  results: store.game.results,
  quit: store.game.quit,
  askRestart: store.game.askRestart,
  askQuit: store.game.askQuit,
  rsp: store.game.rsp,
}))
@observer
class Game extends React.Component {
  componentDidMount() {
    console.log("did mount 후 몇 set? ", this.props.gameSet);
  }

  render() {
    console.log("몇 set? ", this.props.gameSet);
    console.log("결과는?", this.props.results);

    const { quit, askQuit, askRestart } = this.props;
    return quit ? (
      <Redirect push to="/" />
    ) : (
      <>
        <div>
          <button className="game-btns" onClick={askRestart}>
            재시작
          </button>
          <button className="game-btns" onClick={askQuit}>
            그만하기
          </button>
        </div>
        <RunGame />
        <TotalScore />
      </>
    );
  }
}
export default Game;

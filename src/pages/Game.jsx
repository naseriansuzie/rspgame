// import React from "react";

// const Game = () => {
//   return <div>game</div>;
// };

// export default Game;

import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject(stores => ({
  number: stores.game.number,
  increase: stores.game.increase,
  decrease: stores.game.decrease,
}))
@observer
class Game extends Component {
  render() {
    const { number, increase, decrease } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    );
  }
}

export default Game;

import GameStore from "./GameStore";
import SetUpStore from "./SetUpStore";

class RootStore {
  constructor() {
    this.game = new GameStore(this);
    this.setup = new SetUpStore(this);
  }
}

export default RootStore;

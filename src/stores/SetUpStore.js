import { observable, action } from "mobx";

export default class SetUpStore {
  constructor(root) {
    this.root = root;
  }

  @observable playerName = "";

  @observable gameSet = 1;

  @observable currentSet = 1;

  @observable quit = false;

  @observable restart = false;

  @action setPlayerName = e => {
    this.playerName = e.target.value;
  };

  @action increaseSet = () => {
    this.gameSet = this.gameSet + 2;
  };

  @action decreaseSet = () => {
    if (this.gameSet - 2 < 0) {
      alert("1 세트 이상으로 설정해주세요.");
    } else {
      this.gameSet = this.gameSet - 2;
    }
  };
  @action moveToGame = () => {
    this.quit = false;
    this.restart = false;
  };

  @action resetGame = () => {
    this.currentSet = 1;
    this.root.game.round = 1;
    this.root.game.computerHand = null;
    this.root.game.result = null;
    this.root.game.roundResults = [];
  };
  @action makeRestart = () => {
    this.restart = true;
    this.resetGame();
    this.root.game.resetRSPPair();
  };

  @action askRestart = () => {
    if (window.confirm(`1세트부터 재시작합니다. 재시작하시겠습니까?`)) {
      this.makeRestart();
    }
  };

  @action makeQuit = () => {
    this.playerName = "";
    this.quit = true;
    this.gameSet = 1;
    this.resetGame();
  };

  @action askQuit = () => {
    if (
      window.confirm(
        `게임을 종료하고 초기 페이지로 이동합니다. 게임을 그만하시겠습니까?`,
      )
    ) {
      this.makeQuit();
    }
  };
}

import { observable, action, runInAction } from "mobx";

export default class GameStore {
  @observable playerName = "tnwl";

  @observable gameSet = 1;

  @observable currentGameSet = 1;

  @observable computerHand = null;

  @observable result = null;

  @observable win = 0;
  @observable loose = 0;
  @observable draw = 0;

  @observable results = null;
  // [{win : 0 , loose : 3, draw: 0}, ...]

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

  @action makeRestart = () => {
    this.restart = true;
    this.results = [];
  };

  @action askRestart = () => {
    if (window.confirm(`1세트부터 재시작합니다. 재시작하시겠습니까?`)) {
      this.makeRestart();
    } else console.log("취소");
  };

  @action makeQuit = () => {
    this.gameSet = 1;
    this.quit = true;
  };

  @action askQuit = () => {
    if (
      window.confirm(
        `게임을 종료하고 초기 페이지로 이동합니다. 게임을 그만하시겠습니까?`,
      )
    ) {
      this.makeQuit();
    } else console.log("취소");
  };

  @action checkRound = () => {};

  @action runGame = (myHand, computerHand) => {
    if (myHand - computerHand === 0) {
      this.result = "비겼습니다";
      this.draw++;
    } else if (myHand - computerHand === -1 || myHand - computerHand === 2) {
      this.result = "이겼습니다 :)";
      this.win++;
    } else if (myHand - computerHand === 1 || myHand - computerHand === -2) {
      this.result = "졌습니다 :(";
      this.loose++;
    }
  };

  @action setComputerHand = myHand => {
    const rsp = { 가위: 1, 바위: 0, 보: -1 };
    const hands = ["가위", "바위", "보"];
    const idx = Math.floor(Math.random() * 3);
    this.computerHand = hands[idx];
    runInAction(() => this.runGame(myHand, rsp[this.computerHand]));
  };
}

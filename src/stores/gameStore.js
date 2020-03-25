import { observable, action } from "mobx";

export default class GameStore {
  @observable gameSet = 1;

  @observable currentGameSet = 1;

  @observable win = 0;
  @observable loose = 0;
  @observable draw = 0;

  @observable results = null;
  // [{win : 0 , loose : 3, draw: 0}, ...]

  @observable quit = false;

  @observable restart = false;

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

  rsp = { scissors: 1, rock: 0, paper: -1 };

  @action runGame = (myHand, computerHand) => {
    if (myHand - computerHand === 0) {
      this.draw++;
    } else if (myHand - computerHand === -1 || myHand - computerHand === 2) {
      this.win++;
    } else if (myHand - computerHand === 1 || myHand - computerHand === -2) {
      this.loose++;
    }
  };
}

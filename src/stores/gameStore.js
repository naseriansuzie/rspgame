import { observable, action } from "mobx";

export default class GameStore {
  constructor(root) {
    this.root = root;
  }

  @observable round = 1;

  @observable choseHand = false;

  @observable computerHand = null;

  @observable win = 0;
  @observable lose = 0;
  @observable draw = 0;

  @observable result = null;

  @observable roundResults = [];
  // [{win : 0 , lose : 3, draw: 0}, ...]

  @action noticeFinal = () => {
    // 게임 종료를 알리고, 최종 승자를 가른다.
    console.log("모든 set 종료");
  };

  @action prepareNextRound = () => {
    if (this.root.setup.currentSet < this.root.setup.gameSet) {
      this.root.setup.currentSet++;
      this.round = 1;
    } else {
      this.noticeFinal();
    }
  };

  @action resetRSPPair = () => {
    this.win = 0;
    this.lose = 0;
    this.draw = 0;
  };

  @action recordRoundResults = () => {
    this.roundResults = [
      ...this.roundResults,
      {
        win: this.win,
        lose: this.lose,
        draw: this.draw,
      },
    ];
  };

  @action moveToNextSet = () => {
    this.recordRoundResults();
    this.resetRSPPair();
    this.prepareNextRound();
  };

  @action resetHandChoice = () => {
    this.choseHand = false;
  };

  @action checkRound = () => {
    if (this.round < 3) {
      if (this.win >= 2) {
        console.log("이번 세트 승리");
        this.moveToNextSet();
      } else if (this.lose >= 2) {
        console.log("이번 세트 패배");
        this.moveToNextSet();
      } else {
        this.round++;
      }
    } else if (this.round === 3) {
      if (this.win >= 2 || (this.win >= 1 && this.draw === 2)) {
        console.log("이번 세트 승리");
        this.moveToNextSet();
      } else if (this.lose >= 2 || (this.lose >= 1 && this.win === 0)) {
        console.log("이번 세트 패배");
        this.moveToNextSet();
      } else {
        console.log("이번 세트 비김");
        this.moveToNextSet();
      }
    }
    this.resetHandChoice();
    this.root.setup.resetTimer();
  };

  @action makeHandChoice = () => {
    this.choseHand = true;
  };

  @action runGame = (myHand, computerHand) => {
    if (myHand - computerHand === 0) {
      this.result = "무";
      this.draw++;
    } else if (myHand - computerHand === -1 || myHand - computerHand === 2) {
      this.result = "승";
      this.win++;
    } else if (myHand - computerHand === 1 || myHand - computerHand === -2) {
      this.result = "패";
      this.lose++;
    }
    this.makeHandChoice();
    this.checkRound();
  };

  @action setComputerHand = myHand => {
    if (this.root.setup.isTimerOn) {
      const rsp = { 가위: 1, 바위: 0, 보: -1 };
      const hands = ["가위", "바위", "보"];
      const idx = Math.floor(Math.random() * 3);
      this.computerHand = hands[idx];
      this.runGame(myHand, rsp[this.computerHand]);
    } else alert("게임 시작 버튼을 눌러주세요!");
  };

  @action autoLose = () => {
    if (this.choseHand === false) {
      alert("5초가 지났습니다 ㅠㅠ");
      this.result = "패";
      this.computerHand = "자동 승리";
      this.lose++;
      this.checkRound();
    }
  };
}

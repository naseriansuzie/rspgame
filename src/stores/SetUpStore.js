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

  @observable isTimerOn = false;

  @action fillPlayerName = e => {
    this.playerName = e.target.value;
  };

  @action increaseSet = () => {
    this.gameSet++;
  };

  @action decreaseSet = () => {
      this.gameSet--;
  };

  @action moveToGame = () => {
    this.quit = false;
    this.restart = false;
  };

  @action resetGame = () => {
    this.currentSet = 1;
    this.isTimerOn = false;
    this.root.game.isFinished = false;
    this.root.game.finalWinner = null;
    this.root.game.sets = [];
    this.root.game.rounds = null;
    this.root.game.currentRound = 1;
    this.root.game.computerHand = null;
  };

  @action makeRestart = () => {
    this.restart = true;
    this.resetGame();
  };


  @action makeQuit = () => {
    this.playerName = "";
    this.quit = true;
    this.gameSet = 1;
    this.resetGame();
  };

  @action setTimer = () => {
    this.isTimerOn = true;
  };

  @action resetTimer = () => {
    this.isTimerOn = false;
  };
}

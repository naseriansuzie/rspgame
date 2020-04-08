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

  @observable isFinished = false;

  @observable finalWinner = null;

  @action findFinalWinner = () => {
    const winStats = {};
    this.roundResults.map(roundResult => roundResult.winner).forEach(player => {
      if(winStats[player]) {
        winStats[player]++;
      } else winStats[player] = 1;
    })
    let players = Object.keys(winStats);
    let winnings = Object.values(winStats);
    let maxWinning = Math.max(...winnings);
    let idx = winnings.indexOf(maxWinning);

    if (players[idx] === 0) {
      players = players.filter(player => player !== 0);
      winnings = winnings.filter(number => number !== maxWinning);
      maxWinning = Math.max(...winnings);
      idx = winnings.indexOf(maxWinning);
    }
    let count = 0;
    winnings.forEach((number, idx) => {
      if (number === maxWinning && players[idx] !== 0) {
        count++;
      }
    });

    if (count >= 2) {
      this.finalWinner = 0; // no winner
    } else this.finalWinner = Number(players[idx]);
  };

  @action noticeFinal = () => {
    this.isFinished = true;
    this.findFinalWinner();
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

  @action recordRoundResults = winner => {
    this.roundResults = [
      ...this.roundResults,
      {
        key: this.root.setup.currentSet,
        set: this.root.setup.currentSet,
        winner: winner,
        win: this.win,
        lose: this.lose,
        draw: this.draw,
      },
    ];
  };
  
  moveToNextSet = winner => {
    this.recordRoundResults(winner);
    this.resetRSPPair();
    this.prepareNextRound();
  };

  @action resetHandChoice = () => {
    this.choseHand = false;
  };

  @action checkRound = () => {
    if (this.round < 3) {
      if (this.win >= 2) {
        this.moveToNextSet(2); // player wins
      } else if (this.lose >= 2) {
        this.moveToNextSet(1); // computer wins
      } else {
        this.round++;
      }
    } else if (this.round === 3) {
      if (this.win >= 2 || (this.win >= 1 && this.draw === 2)) {
        this.moveToNextSet(2); // player wins
      } else if (this.lose >= 2 || (this.lose >= 1 && this.win === 0)) {
        this.moveToNextSet(1); // computer wins
      } else {
        this.moveToNextSet(0); // no winner
      }
    }
    this.resetHandChoice();
    this.root.setup.resetTimer();
  };

  @action makeHandChoice = () => {
    this.choseHand = true;
  };

  @action runGame = (myHand, computerHand) => {
    const calculation = myHand - computerHand;
    if (calculation === 1 || calculation === -2) {
      this.result = 1;
      this.lose++;
    } else if (calculation === 0) {
      this.result = 2;
      this.draw++;
    } else if (calculation === -1 || calculation === 2) {
      this.result = 3;
      this.win++;
    }
    this.makeHandChoice();
    this.checkRound();
  };

  @action pickComputerHand = myHand => {
    const rsp = {ROCK : 0, SCISSORS : 1, PAPER : -1};
    const hands = Object.keys(rsp); // [ROCK, SCISSORS, PAPER]
    const idx = Math.floor(Math.random() * 3);
    this.computerHand = rsp[hands[idx]];
    this.runGame(myHand, this.computerHand);
  };


  @action autoLose = () => {
      this.result = 1;
      this.computerHand = 2;
      this.lose++;
      this.checkRound();
  };
}
import { observable, action } from "mobx";
import { AUTOWIN, COMPUTER, PLAYER, DRAW, RSP, MIDDLE_ROUND, FINAL_ROUND } from "../constant";

export default class GameStore {
  constructor(root) {
    this.root = root;
  }

  @observable choseHand = false;
  
  @observable computerHand = null;
  
  @observable currentRound = 1;

  @observable rounds = [];

  @observable sets = [];

  @observable isFinished = false;

  @observable finalWinner = null;

  // 누적된 세트 기록에 따라서 최종 승자 기록
  @action findFinalWinner = () => {
    const winStats = {};
    this.sets.map(set => set.winner).forEach(player => {
      if(winStats[player]) {
        winStats[player]++;
      } else winStats[player] = 1;
    })
    let players = Object.keys(winStats);
    let winnings = Object.values(winStats);
    let maxWinning = Math.max(...winnings);
    let idx = winnings.indexOf(maxWinning);
    
    if (!players[idx]) {
      this.finalWinner = DRAW;
    } else {
      if (players[idx] === DRAW) {
        players = players.filter(player => player !== DRAW);
        winnings = winnings.filter(number => number !== maxWinning);
        maxWinning = Math.max(...winnings);
        idx = winnings.indexOf(maxWinning);
      }
      let count = 0;
      winnings.forEach((number, idx) => {
        if (number === maxWinning && players[idx] !== DRAW) {
          count++;
        }
      });
      
      if (count >= 2) {
        this.finalWinner = DRAW;
      } else this.finalWinner = players[idx];
    }
  };

  // 세트 종료
  @action noticeFinal = () => {
    this.isFinished = true;
    this.findFinalWinner();
  };

  // 세트 진행 상황에 따라 진행 여부 판단
  @action prepareNextRound = () => {
    if (this.root.setup.currentSet < this.root.setup.gameSet) {
      this.root.setup.currentSet++;
      this.currentRound = 1;
      this.rounds = [];
    } else {
      this.noticeFinal();
    }
  };

  // 세트 기록
  @action recordSets = winner => {
    this.sets = [
      ...this.sets,
      {
        key: this.root.setup.currentSet,
        set: this.root.setup.currentSet,
        winner: winner,
      },
    ];
  };

  // 기존 세트의 승자를 기록하고, 다음 세트를 위해 rounds와 currentRound 리셋
  moveToNextSet = winner => {
    this.recordSets(winner);
    this.prepareNextRound();
  };

  @action resetHandChoice = () => {
    this.choseHand = false;
  };

  makeWinCount (filteredWinners) {
    let winCount = {};
      filteredWinners.forEach(winner => {
        if(winCount[winner]) {
          winCount[winner]++;
        } else winCount[winner] = 1;
      });
    return winCount;
  }

  findWinnerAtFinalRound() {
    let setWinner = "";
    let filteredWinners = this.rounds.map(round => round.winner).filter(winner => winner !== DRAW);
    if(filteredWinners.length === 0) {
      setWinner = DRAW;
    } else if(filteredWinners.length === 1) {
      setWinner = filteredWinners[0];
    } else if(filteredWinners.length >= 2) {
      let winCount = this.makeWinCount(filteredWinners);
      if(winCount[COMPUTER] === winCount[PLAYER]) {
        setWinner = DRAW;
      } else if(winCount[COMPUTER] > winCount[PLAYER]) {
        setWinner = COMPUTER;
      } else setWinner = PLAYER;
    }
    this.moveToNextSet(setWinner);
  }

  @action findWinnerAtMiddleRound() {
    let setWinner = this.rounds.reduce((acc, cur) => {
      if(acc.winner === cur.winner) {
        return acc.winner;
      } else return undefined;
    })
    if(setWinner && setWinner !== DRAW) {
      this.moveToNextSet(setWinner);
    } else this.currentRound++;
  }

  // 라운드 진척 상황에 따라 승자를 판단
  @action checkRound = () => {
    if(this.rounds.length === MIDDLE_ROUND) {
      this.findWinnerAtMiddleRound();
    } else if(this.rounds.length === FINAL_ROUND) {
      this.findWinnerAtFinalRound();
    } else {
      this.currentRound++;
    }
    this.resetHandChoice();
    this.root.setup.resetTimer();
  };

  @action makeHandChoice = () => {
    this.choseHand = true;
  };

  // 플레이어 패와 컴퓨터 패를 가지고 게임 진행 & 라운드 결과 기록
  @action runGame = (myHand, computerHand) => {
    const calculation = myHand - computerHand;
    console.log('myHand', myHand);
    console.log('computerHand', computerHand);
    let result;

    if (calculation === 1 || calculation === -2) {
      result = {winner : COMPUTER, isDraw: false};
    } else if (calculation === 0) {
      result = {winner : DRAW, isDraw: true};
    } else if (calculation === -1 || calculation === 2) {
      result = {winner : PLAYER, isDraw: false};
    }

    this.rounds = [...this.rounds, result];
    this.makeHandChoice();
    this.checkRound();
  };

  // 컴퓨터가 패를 고름
  @action pickComputerHand = myHand => {
    const hands = Object.keys(RSP);
    const idx = Math.floor(Math.random() * 3);
    this.computerHand = hands[idx];
    this.runGame(myHand, RSP[this.computerHand]);
  };

  @action autoLose = () => {
    this.rounds = [...this.rounds, {winner : COMPUTER, isDraw: false}];
    this.computerHand = AUTOWIN;
    this.checkRound();
  };
}
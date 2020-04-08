import { observable, action } from "mobx";
import { AUTOWIN, COMPUTER, PLAYER, DRAW, RSP } from "../constant";

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

  // 라운드 진척 상황에 따라 승자를 판단
  @action checkRound = () => {
    /*
    0. 세트 위너 변수 빈 스트링으로 선언
    1. 라운드 누적 기록이 2개일 때
     1-1. 라운즈를 리듀스로 순회하면서 위너가 같은 값인지 확인해서 리턴한 값을 세트 위너에 할당
     1-2. 만약 세트 위너가 truthy면서 draw인 상황이 아니면
      1-2-1. 세트 승자 기록
      1-2-2. 경기 종료하고 moveToNextSet의 변수로 세트 위너 넘기기
     1-3. 1-2가 아니면 커렌트 라운드를 1 올림
    2. 라운드 누적 기록이 3개일 때
     2-1. 라운즈를 맵으로 순회하면서 위너만 남기기 그런 다음 필터로 순회하면서 위너가 draw인 것을 걸러서 필터드 라운즈에 할당
     2-2. 필터드 라운즈 속성이 0개이면 무승부
     2-3. 필터드 라운즈 속성이 1개이면 해당 위너가 세트 위너
     2-4. 필터드 라운즈 속성이 2개 이상인 경우
      2-4-1. 포이치로 돌면서 객체로 만들기 키는 위너, 밸류는 카운트로
      2-4-2. 객체[컴]이 객체[플]와 같으면 무승부
      2-4-3. 객체[컴]이 객체[플]보다 크면 컴이 승리
      2-4-4. 객체[플]가 객체[컴]보다 크면 플레이어가 승리
     2-5. moveToNextSet의 변수로 세트 위너 넘기기
    3. 1도 아니고 2도 아니면 커렌트 라운드를 1 올림
    */

    let setWinner = "";
    if(this.rounds.length === 2) {
      setWinner = this.rounds.reduce((acc, cur) => {
        if(acc.winner === cur.winner) {
          return acc.winner;
        } else return undefined;
      });
      if(setWinner && setWinner !== DRAW) {
        this.moveToNextSet(setWinner);
      } else this.currentRound++;
    } else if(this.rounds.length === 3) {
      let filteredWinners = this.rounds.map(round => round.winner).filter(winner => winner !== DRAW);
      if(filteredWinners.length === 0) {
        setWinner = DRAW;
      } else if(filteredWinners.length === 1) {
        setWinner = filteredWinners[0];
      } else if(filteredWinners.length >= 2) {
        let winCount = {};
        filteredWinners.forEach(winner => {
          if(winCount[winner]) {
            winCount[winner]++;
          } else winCount[winner] = 1;
        });
        if(winCount[COMPUTER] === winCount[PLAYER]) {
          setWinner = DRAW;
        } else if(winCount[COMPUTER] > winCount[PLAYER]) {
          setWinner = COMPUTER;
        } else setWinner = PLAYER;
      }
      this.moveToNextSet(setWinner);
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
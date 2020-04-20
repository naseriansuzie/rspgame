const {
  ROCK,
  SCISSORS,
  PAPER,
  AUTOWIN,
  PLAYER,
  COMPUTER,
} = require("./constant");

exports.getHandValue = function (type) {
  switch (type) {
    case ROCK:
      return "바위";
    case SCISSORS:
      return "가위";
    case PAPER:
      return "보";
    case AUTOWIN:
      return "자동 승리";
    default:
      return "";
  }
};

exports.getWinnerValue = function (winner, name) {
  switch (winner) {
    case PLAYER:
      return name;
    case COMPUTER:
      return "컴퓨터";
    case null:
      return "무승부";
    default:
      return "";
  }
};

const cells = document.querySelectorAll(".cell");
const statuText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart");

const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let runningStatus = false;
intializeGame();
function intializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statuText.textContent = `${currentPlayer}'s Turn`;
  runningStatus = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !runningStatus) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.background = "yellow";
}
function checkWinner() {
  let round = false;
  for (let i = 0; i < winningCondition.length; i++) {
    let condition = winningCondition[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      round = true;
      break;
    }
  }
  if (round) {
    statuText.textContent = `${currentPlayer}'s has won`;
    cells.forEach((cell) => {
      cell.style.background = "red";
    });
    runningStatus = false;
  } else if (!options.includes("")) {
    statuText.textContent = "Draw!";
    runningStatus = false;
  } else {
    changePlayer();
  }
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statuText.textContent = `${currentPlayer}'s Turn`;
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statuText.textContent = `${currentPlayer}'s Turn`;
  cells.forEach((cell) => {
    cell.style.background = "rgb(13, 172, 241)";
    cell.textContent = "";
  });
  runningStatus = true;
}

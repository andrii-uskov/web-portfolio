const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

function handleMove(index) {
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;

  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  cells[index].setAttribute(
    "aria-label",
    `Клетка ${index + 1}: ${currentPlayer}`
  );
  cells[index].disabled = true;

  const winningLine = findWinningLine();

  if (winningLine) {
    statusText.textContent = `Победил игрок ${currentPlayer}!`;

    winningLine.forEach((cellIndex) => {
      cells[cellIndex].classList.add("winner");
    });

    finishGame();
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Ничья!";
    finishGame();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Ход игрока ${currentPlayer}`;
}

function findWinningLine() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return combination;
    }
  }

  return null;
}

function finishGame() {
  gameActive = false;

  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;

  statusText.textContent = "Ход игрока X";

  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winner");
    cell.disabled = false;
    cell.setAttribute("aria-label", `Клетка ${index + 1}`);
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    handleMove(index);
  });
});

restartButton.addEventListener("click", restartGame);

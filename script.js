let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
let mode = "2player";

// Mode selection
document.querySelectorAll('input[name="mode"]').forEach(radio => {
  radio.addEventListener("change", () => {
    mode = document.querySelector('input[name="mode"]:checked').value;
    restartGame();
  });
});

// Winning conditions
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Handle clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.getAttribute("data-index"));
    if (board[index] !== "" || !gameActive) return;

    if (mode === "2player") {
      makeMove(index, currentPlayer);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else if (mode === "ai") {
      // Human is always X
      makeMove(index, "X");
      if (gameActive) aiMove(); // AI moves immediately after X
    }
  });
});

// Make a move
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  checkResult();
}

// Simple AI: choose random empty cell
function aiMove() {
  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyIndices.length === 0) return;

  let choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(choice, "O");
}

// Check game state
function checkResult() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${board[a]} Wins!`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  }
}

// Restart game
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "";
  cells.forEach(cell => cell.textContent = "");
}
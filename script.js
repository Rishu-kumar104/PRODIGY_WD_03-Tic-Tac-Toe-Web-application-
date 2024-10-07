const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute('data-index');

  if (board[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(clickedCell, clickedCellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
}

function checkWinner() {
  let roundWon = false;
  
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusDisplay.innerHTML = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.innerHTML = '';
  cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

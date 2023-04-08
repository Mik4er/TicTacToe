const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameIsOver = false;

const checkWinner = () => {
  if (
    cells[0].textContent === currentPlayer &&
    cells[1].textContent === currentPlayer &&
    cells[2].textContent === currentPlayer ||
    cells[3].textContent === currentPlayer &&
    cells[4].textContent === currentPlayer &&
    cells[5].textContent === currentPlayer ||
    cells[6].textContent === currentPlayer &&
    cells[7].textContent === currentPlayer &&
    cells[8].textContent === currentPlayer ||
    cells[0].textContent === currentPlayer &&
    cells[3].textContent === currentPlayer &&
    cells[6].textContent === currentPlayer ||
    cells[1].textContent === currentPlayer &&
    cells[4].textContent === currentPlayer &&
    cells[7].textContent === currentPlayer ||
    cells[2].textContent === currentPlayer &&
    cells[5].textContent === currentPlayer &&
    cells[8].textContent === currentPlayer ||
    cells[0].textContent === currentPlayer &&
    cells[4].textContent === currentPlayer &&
    cells[8].textContent === currentPlayer ||
    cells[2].textContent === currentPlayer &&
    cells[4].textContent === currentPlayer &&
    cells[6].textContent === currentPlayer
  ) {
    return true;
  } else {
    return false;
  }
};

const checkTie = () => {
  let tie = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === '') {
      tie = false;
      break;
    }
  }
  if (tie) {
    message.textContent = "It's a tie!";
    gameIsOver = true;
  }
};

const handleClick = (event) => {
  if (!gameIsOver && event.target.textContent === '') {
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      message.textContent = `${currentPlayer} wins!`;
      gameIsOver = true;
    } else {
      checkTie();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
};

const handleRestart = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
  message.textContent = '';
  currentPlayer = 'X';
  gameIsOver = false;
};

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameIsOver = false;
  message.textContent = '';
}
restartButton.addEventListener('click', handleRestart);

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick);
});

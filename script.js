const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const startButton = document.getElementById('start');
const message = document.getElementById('message');

let gameBoard = [[], []];
let currentRow = 0;
let gameActive = false;

function initializeBoard() {
    column1.innerHTML = '';
    column2.innerHTML = '';
    gameBoard = [[], []];
    currentRow = 0;
    message.textContent = '';
    for (let i = 0; i < 5; i++) {
        gameBoard[0].push({row: i, safe: Math.random() > 0.5});
        gameBoard[1].push({row: i, safe: Math.random() > 0.5});
    }
    renderBoard();
    gameActive = true;
}

function renderBoard() {
    column1.innerHTML = '';
    column2.innerHTML = '';

    gameBoard[0].forEach(block => {
        const div = document.createElement('div');
        div.textContent = block.row + 1;
        column1.appendChild(div);
    });

    gameBoard[1].forEach(block => {
        const div = document.createElement('div');
        div.textContent = block.row + 1;
        column2.appendChild(div);
    });
}

function handleMove(columnIndex) {
    if (!gameActive) return;

    if (currentRow >= 5) {
        message.textContent = 'You have reached the top!';
        gameActive = false;
        return;
    }

    if (!gameBoard[columnIndex][currentRow].safe) {
        message.textContent = 'You lost! Game over.';
        gameActive = false;
        return;
    }

    currentRow++;
    if (currentRow === 5) {
        message.textContent = 'Congratulations! You won!';
        gameActive = false;
        return;
    }

    renderBoard();
}

startButton.addEventListener('click', () => {
    initializeBoard();
    message.textContent = 'Game started. Click on columns to move up.';
});

column1.addEventListener('click', () => {
    handleMove(0);
});

column2.addEventListener('click', () => {
    handleMove(1);
});

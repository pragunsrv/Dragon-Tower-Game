const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const startButton = document.getElementById('start');
const message = document.getElementById('message');

let gameBoard = [[], []];
let moveCount = 0;

// Initialize the game board
function initializeBoard() {
    column1.innerHTML = '';
    column2.innerHTML = '';
    gameBoard = [[], []];
    moveCount = 0;
    message.textContent = '';
    for (let i = 0; i < 5; i++) {
        const block = document.createElement('div');
        block.textContent = i + 1;
        column1.appendChild(block);
        gameBoard[0].push(i + 1);
    }
}

// Handle the move
function handleMove(source, target) {
    if (gameBoard[source].length === 0) {
        message.textContent = 'No blocks to move from this column.';
        return;
    }
    
    if (gameBoard[target].length === 5) {
        message.textContent = 'Target column is full.';
        return;
    }

    const block = gameBoard[source].pop();
    gameBoard[target].push(block);

    renderBoard();
    moveCount++;
    if (moveCount === 10) {
        message.textContent = 'Game Over!';
    }
}

// Render the game board
function renderBoard() {
    column1.innerHTML = '';
    column2.innerHTML = '';
    
    gameBoard[0].forEach(block => {
        const div = document.createElement('div');
        div.textContent = block;
        column1.appendChild(div);
    });

    gameBoard[1].forEach(block => {
        const div = document.createElement('div');
        div.textContent = block;
        column2.appendChild(div);
    });
}

// Start the game
startButton.addEventListener('click', () => {
    initializeBoard();
    document.addEventListener('click', (event) => {
        if (event.target.closest('.column')) {
            const column = event.target.closest('.column');
            const index = column.id === 'column1' ? 0 : 1;
            handleMove(0, index);
        }
    });
});

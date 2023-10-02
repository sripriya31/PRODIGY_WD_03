// JavaScript code for the game logic and user interaction

// Constants for players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Variables to track the current player and the game board
let currentPlayer = PLAYER_X;
let board = ['', '', '', '', '', '', '', '', ''];

// Array to store winning combinations
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to create the game board
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, i));
        gameBoard.appendChild(cell);
    }
}

// Function to handle cell clicks
function handleCellClick(cell, index) {
    if (board[index] === '' && !checkGameEnd()) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        
        if (checkWin(currentPlayer)) {
            showMessage(`${currentPlayer} wins!`);
        } else if (board.indexOf('') === -1) {
            showMessage("It's a tie!");
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            if (currentPlayer === PLAYER_O && document.getElementById('mode').value === 'ai') {
                // AI's turn in "Player vs. AI" mode
                makeAIMove();
            }
        }
    }
}

// Function to check for a win
function checkWin(player) {
    for (const combination of winCombinations) {
        if (combination.every(index => board[index] === player)) {
            return true;
        }
    }
    return false;
}

// Function to check if the game has ended
function checkGameEnd() {
    return board.indexOf('') === -1;
}

// Function to display a message
function showMessage(message) {
    document.getElementById('message').textContent = message;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = PLAYER_X;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(PLAYER_X, PLAYER_O);
    });
    showMessage('');
    document.getElementById('ai-move').textContent = '';
}

// Function to handle mode selection form submission
function handleModeSelection(event) {
    event.preventDefault(); // Prevent form submission
    const selectedMode = document.getElementById('mode').value;
    document.getElementById('selected-mode').textContent = `Selected Mode: ${selectedMode}`;
    createGameBoard();
    resetGame();
}

// Function to make AI move
function makeAIMove() {
    // Implement AI logic here (e.g., random move)
    const emptyCells = board.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMoveIndex = emptyCells[randomIndex];

    setTimeout(() => {
        const aiCell = document.querySelectorAll('.cell')[aiMoveIndex];
        handleCellClick(aiCell, aiMoveIndex);
    }, 1000); // Add a delay for AI's move for a better user experience
}

// Event listener for the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);

// Event listener for mode selection form submission
document.getElementById('mode-form').addEventListener('submit', handleModeSelection);

// Initialize the game board when the page loads
createGameBoard();

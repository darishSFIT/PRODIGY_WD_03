const statusDisplay = document.querySelector('.game--status');
const line = document.querySelector('.line');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `<b>Player ${currentPlayer} has won</b>!`;
const drawMessage = () => `<b>Game ended in a draw</b>!`;
const currentPlayerTurn = () => `<b>It's ${currentPlayer} turn</b>`;
statusDisplay.innerHTML = currentPlayerTurn();
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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function showWinningLine(index) {
    line.style.display = 'block';
    line.classList.remove('horizontal-0', 'horizontal-1', 'horizontal-2', 'vertical-0', 'vertical-1', 'vertical-2', 'diagonal-0', 'diagonal-1');
    switch (index) {
        case 0:
            line.classList.add('horizontal-0');
            break;
        case 1:
            line.classList.add('horizontal-1');
            break;
        case 2:
            line.classList.add('horizontal-2');
            break;
        case 3:
            line.classList.add('vertical-0');
            break;
        case 4:
            line.classList.add('vertical-1');
            break;
        case 5:
            line.classList.add('vertical-2');
            break;
        case 6:
            line.classList.add('diagonal-0');
            break;
        case 7:
            line.classList.add('diagonal-1');
            break;
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            showWinningLine(i);
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    line.style.display = 'none';
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

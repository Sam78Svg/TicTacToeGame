
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const statusDisplay = document.getElementById('gameStatus');
    const resetButton = document.getElementById('resetButton');

    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

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

    // Initialize Board
    function createBoard() {
        board.innerHTML = "";
        gameState.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        clickedCell.classList.add('taken');
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
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerText = `Player ${currentPlayer} Wins! 🎉`;
            statusDisplay.style.color = "#27ae60";
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerText = "It's a Draw! 🤝";
            statusDisplay.style.color = "#7f8c8d";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
        statusDisplay.style.color = "#2c3e50";
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerText = `Player X's Turn`;
        statusDisplay.style.color = "#2c3e50";
        createBoard();
    }

    resetButton.addEventListener('click', handleRestartGame);

    // Initial startup
    createBoard();
});
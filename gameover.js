document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("gameOverPopup");
    const finalScore = document.getElementById("finalScore");
    const playAgainBtn = document.querySelector("#gameOverPopup button");

    function isGameOver(board) {
        const size = board.length;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (board[r][c] === 0) return false;
                if (c < size - 1 && board[r][c] === board[r][c + 1]) return false;
                if (r < size - 1 && board[r][c] === board[r + 1][c]) return false;
            }
        }
        return true;
    }

    function getHighestTile(board) {
        return Math.max(...board.flat());
    }

    let gameEnded = false;

    const checkInterval = setInterval(() => {
        if (typeof window.board === 'undefined') return;

        const board = window.board;

        if (!gameEnded && isGameOver(board)) {
            gameEnded = true;
            clearInterval(checkInterval);

            const score = getHighestTile(board);
            finalScore.textContent = `Score: ${score}`;
            popup.style.display = "flex";
        }
    }, 300);

    playAgainBtn.addEventListener("click", () => {
        location.reload();
    });
});

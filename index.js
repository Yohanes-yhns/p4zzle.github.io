document.addEventListener("DOMContentLoaded", () => {
    const gridSize = 4;
    const grid = document.getElementById("grid");
    let cells = [];
    window.board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    let startX, startY, endX, endY;
    
    function createGrid() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
            cells.push(cell);
        }
        generateNumber();
        generateNumber();
        updateGrid();
    }
    
    function generateNumber() {
        let emptyCells = [];
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (board[r][c] === 0) {
                    emptyCells.push({ r, c });
                }
            }
        }
        if (emptyCells.length > 0) {
            let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[r][c] = Math.random() > 0.1 ? 2 : 4;
        }
    }
    
    function updateGrid() {
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                let value = board[r][c];
                let index = r * gridSize + c;
                cells[index].textContent = value === 0 ? "" : value;
                cells[index].style.background = value ? "#b4b4b4" : "#d4d4d4";
            }
        }
    }
    
    function move(direction) {
        let moved = false;
        
        function slide(row) {
            let filteredRow = row.filter(val => val);
            for (let i = 0; i < filteredRow.length - 1; i++) {
                if (filteredRow[i] === filteredRow[i + 1]) {
                    filteredRow[i] *= 2;
                    filteredRow.splice(i + 1, 1);
                    filteredRow.push(0);
                }
            }
            while (filteredRow.length < gridSize) {
                filteredRow.push(0);
            }
            return filteredRow;
        }
        
        if (direction === "left") {
            for (let r = 0; r < gridSize; r++) {
                let newRow = slide(board[r]);
                if (newRow.toString() !== board[r].toString()) moved = true;
                board[r] = newRow;
            }
        } else if (direction === "right") {
            for (let r = 0; r < gridSize; r++) {
                let newRow = slide(board[r].slice().reverse()).reverse();
                if (newRow.toString() !== board[r].toString()) moved = true;
                board[r] = newRow;
            }
        } else if (direction === "up" || direction === "down") {
            for (let c = 0; c < gridSize; c++) {
                let col = board.map(row => row[c]);
                let newCol = direction === "up" ? slide(col) : slide(col.reverse()).reverse();
                if (newCol.toString() !== col.toString()) moved = true;
                for (let r = 0; r < gridSize; r++) {
                    board[r][c] = newCol[r];
                }
            }
        }
        
        if (moved) {
            generateNumber();
            updateGrid();
        }
    }
    
    document.addEventListener("keydown", (event) => {
        if (event.key.includes("Arrow")) {
            move(event.key.replace("Arrow", "").toLowerCase());
        }
    });
    
    grid.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    grid.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    });
    
    function handleSwipe() {
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            move(deltaX > 0 ? "right" : "left");
        } else {
            move(deltaY > 0 ? "down" : "up");
        }
    }
    
    createGrid();

});

document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("usernameInput");
    const passwordInput = document.getElementById("passwordInput");
    const enterButton = document.getElementById("enterBtn");
    const greetingText = document.getElementById("greeting"); 
    const grid = document.getElementById("grid");
    const text = document.getElementById("text");
    const cardRank = document.getElementById("cardRank");
    const closeButton = document.getElementById("enterBtn-close");

    function startGame() {
        
        grid.style.visibility = "visible"; 
        
    }

    enterButton.addEventListener("click", function () {
        const username = usernameInput.value.trim(); 
        const password = passwordInput.value.trim();
    
        if (username && password) {
            greetingText.textContent = `Selamat bermain, ${username}`; 
            usernameInput.style.display = "none"; 
            passwordInput.style.display = "none";
            enterButton.style.display = "none";
            text.style.display = "none";
            cardRank.style.display = "none";
            closeButton.style.display = "inline-flex";
    
            startGame(); 
        } else {
            alert("Harap masukkan username dan password dengan benar!"); 
        }
    });
    

    grid.style.visibility = "hidden"; 
});


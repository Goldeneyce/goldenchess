// Define chess pieces as objects
 const pieces = {
  "rook": "♖",
  "knight": "♘",
  "bishop": "♗",
  "queen": "♕",
  "king": "♔",
  "pawn": "♙"
};

// Define initial chessboard state as 2D array
const board = [  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"]
];

// Create function to render chessboard
function renderBoard() {
  const chessboard = document.querySelector(".chessboard");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");

      square.className = ((i + j) % 2 === 0) ? "white" : "black";
      square.innerText = board[i][j];

      chessboard.appendChild(square);
    }
  }
}

// Call renderBoard function to display chessboard
renderBoard(); 

/*
// update 1

// Define chess pieces as objects
const pieces = {
  "rook": "♖",
  "knight": "♘",
  "bishop": "♗",
  "queen": "♕",
  "king": "♔",
  "pawn": "♙"
};

// Define initial chessboard state as 2D array
const board = [
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"]
];

// Create function to render chessboard
function renderBoard() {
  const chessboard = document.querySelector(".chessboard");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");

      square.className = ((i + j) % 2 === 0) ? "white" : "black";
      square.innerText = board[i][j];

      // Add event listener to each square
      square.addEventListener("click", function() {
        // Check if square is currently selected
        if (this.classList.contains("selected")) {
          // Deselect square
          this.classList.remove("selected");
        } else {
          // Deselect any previously selected squares
          const selected = document.querySelector(".selected");
          if (selected) selected.classList.remove("selected");

          // Select current square
          this.classList.add("selected");
        }
      });

      chessboard.appendChild(square);
    }
  }
}

// Call renderBoard function
renderBoard();

// Create function to validate move
function isValidMove(startRow, startCol, endRow, endCol) {
  // Check if start and end positions are within the board boundaries
  if (startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 ||
      endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7) {
    return false;
  }

  // Check if start and end positions are different
  if (startRow === endRow && startCol === endCol) {
    return false;
  }

  // Check if there is a piece at the starting position
  const piece = board[startRow][startCol];
  if (piece === "") {
    return false;
  }

  // Check if the piece can make the specific move
  switch(piece) {
    case "♙":
      if (startRow === 1) {
        // Check if pawn is moving two squares
        if (endRow === startRow + 2 && endCol === startCol) {
          return true;
        }
      }

      // Check if pawn is moving one square
      if (endRow === startRow + 1 && endCol === startCol) {
        return true       }
      break;
    case "♟":
      if (startRow === 6) {
        // Check if pawn is moving two squares
        if (endRow === startRow - 2 && endCol === startCol) {
          return true;
        }
      }

      // Check if pawn is moving one square
      if (endRow === startRow - 1 && endCol === startCol) {
        return true;
      }
      break;
    case "♘":
    case "♞":
      // Check if knight is moving in L-shape
      if ((Math.abs(endRow - startRow) === 2 && Math.abs(endCol - startCol) === 1) ||
          (Math.abs(endRow - startRow) === 1 && Math.abs(endCol - startCol) === 2)) {
        return true;
      }
      break;
    case "♗":
    case "♝":
      // Check if bishop is moving diagonally
      if (Math.abs(endRow - startRow) === Math.abs(endCol - startCol)) {
        // Check if there are any pieces in the path
        const rowDirection = (endRow > startRow) ? 1 : -1;
        const colDirection = (endCol > startCol) ? 1 : -1;
        let row = startRow + rowDirection;
        let col = startCol + colDirection;
        while (row !== endRow && col !== endCol) {
          if (board[row][col] !== "") {
            return false;
          }
          row += rowDirection;
          col += colDirection;
        }
        return true;
      }
      break;
    case "♖":
    case "♜":
      // Check if rook is moving vertically or horizontally
      if (startRow === endRow || startCol === endCol) {
        // Check if there are any pieces in the path
        if (startRow === endRow) {
          // Check horizontal path
          const colDirection = (endCol > startCol) ? 1 : -1;
          let col = startCol + colDirection;
          while (col !== endCol) {
            if (board[startRow][col] !== "") {
              return false;
            }
            col += colDirection;
          }
        } else {
          // Check vertical path
          const rowDirection = (endRow > startRow) ? 1 : -1;
          let row = startRow + rowDirection;
          while (row !== endRow) {
            if (board[row][startCol] !== "") {
              return false;
            }
            row += rowDirection;
          }
        }
        return true;
      }
      break;
    case "♕":
    case "♛":
      // Check if queen is moving diagonally or vertically or horizontally
      if (Math.abs(endRow - startRow) === Math.abs(endCol - startCol) ||
          startRow === endRow || startCol === endCol) {
        // Check if there are any pieces in the path
        if (startRow === endRow) {
          // Check horizontal path
          const colDirection = (endCol > startCol) ? 1 : -1;
          let col = startCol + colDirection;
          while (col !== endCol) {
            if (board[startRow][col] !== "") {
              return false;
            }
            col += colDirection;
          }
        } else if (startCol === endCol) {
          // Check vertical path
          const rowDirection = (endRow > start
          while (row !== endRow) {
            if (board[row][startCol] !== "") {
              return false;
            }
            row += rowDirection;
          }
        } else {
          // Check diagonal path
          const rowDirection = (endRow > startRow) ? 1 : -1;
          const colDirection = (endCol > startCol) ? 1 : -1;
          let row = startRow + rowDirection;
          let col = startCol + colDirection;
          while (row !== endRow && col !== endCol) {
            if (board[row][col] !== "") {
              return false;
            }
            row += rowDirection;
            col += colDirection;
          }
        }
        return true;
      }
      break;
    }
    return false;
  }

  // Move piece to new position on board
  function movePiece(startRow, startCol, endRow, endCol) {
    const piece = board[startRow][startCol];
    board[startRow][startCol] = "";
    board[endRow][endCol] = piece;
    renderBoard();
  }

  // Handle click on board squares
  function handleSquareClick(row, col) {
    if (selectedPiece) {
      if (validateMove(selectedPiece.row, selectedPiece.col, row, col)) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
      }
      selectedPiece = null;
    } else if (board[row][col] !== "") {
      selectedPiece = { row: row, col: col };
    }
  }

  // Render board on screen
  function renderBoard() {
    let html = "";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        html += `<div class="square ${getColor(row, col)}" onclick="handleSquareClick(${row}, ${col})">${piece}</div>`;
      }
    }
    document.getElementById("board").innerHTML = html;
  }

  // Initialize board
  function init() {
    board[0] = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
    board[1] = ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"];
    board[2] = ["", "", "", "", "", "", "", ""];
    board[3] = ["", "", "", "", "", "", "", ""];
    board[4] = ["", "", "", "", "", "", "", ""];
    board[5] = ["", "", "", "", "", "", "", ""];
    board[6] = ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"];
    board[7] = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
    renderBoard();
  }

  init();. */



      

// Define chess pieces as objects
/* const pieces = {
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
renderBoard(); */


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
          // Deselect square if clicked again
          this.classList.remove("selected");
        } else {
          // Deselect previously selected square
          const selected = document.querySelector(".selected");
          if (selected) {
            selected.classList.remove("selected");
          }
          // Select new square
          this.classList.add("selected");
        }
      });

      chessboard.appendChild(square);
    }
  }
}

// Call renderBoard function to display chessboard
renderBoard();

// Create function to validate move
function isValidMove(startRow, startCol, endRow, endCol) {
  const piece = board[startRow][startCol];
  const target = board[endRow][endCol];

  // Check if target square is occupied by same color piece
  if (piece !== "" && piece === target) {
    return false;
  }

  // Implement move validation for each piece type
  switch (piece) {
    case "♖": // rook
      return startRow === endRow || startCol === endCol;
    case "♘": // knight
      const dx = Math.abs(startRow - endRow);
      const dy = Math.abs(startCol - endCol);
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    case "♗": // bishop
      return Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
    case "♕": // queen
      return (startRow === endRow || startCol === endCol) ||
             (Math.abs(startRow - endRow) === Math.abs(startCol - endCol));
    case "

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

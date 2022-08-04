const squaresContainer = document.querySelector('.squares-container');

let gridSize = 20;

function createSquares(gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.textContent = 'S';
    square.style.width = `calc(25rem / ${gridSize})`;
    square.style.height = `calc(25rem / ${gridSize})`;
    square.classList.add('square', 'center');
    squaresContainer.append(square);
  }
}

createSquares(gridSize);
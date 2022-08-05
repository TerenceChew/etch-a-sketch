const squaresContainer = document.querySelector('.squares-container');
// console.log(squaresContainer.width) ?? or style.width ??
let gridSize = 75;

createSquares(gridSize);

// Create and append squares to squaresContainer
function createSquares(gridSize) {
  for (let i = 1; i <= gridSize * gridSize; i++) {
    const square = document.createElement('div');
    // square.textContent = `${i}`;
    // 25rem is the squaresContainer's width & height
    square.style.width = `calc(25rem / ${gridSize})`;
    square.style.height = `calc(25rem / ${gridSize})`;
    square.addEventListener('mouseover', sketch, {once: true});
    square.classList.add('square', 'center');    
    squaresContainer.append(square);
  }
}

// Change bg color of square
function sketch(e) {
  // console.log('sketch');
  // console.log(e.type);
  // e.preventDefault();
  let square = e.target;
  // square.textContent = '';
  square.style.backgroundColor = 'pink';
}



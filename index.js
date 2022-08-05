const squaresContainer = document.querySelector('.squares-container');
const inputBtn = document.querySelector('.input-btn');
const resetBtn = document.querySelector('.reset-btn');

// Create squares with default grid size
let defaultGridSize = 3;
createSquares(defaultGridSize);

let gridSize;

// Prompt grid size to create squares
function getGridSize() {
  gridSize = Number(prompt('Enter Grid Size:', ''));
  if (!gridSize) return;
  if (gridSize > 100) {
    alert('Grid size cannot exceed 100');
    getGridSize();
  } else {
    createSquares(gridSize);
  }
}

inputBtn.addEventListener('click', getGridSize);

// Reset squares to default color
function resetSquares() {
  createSquares(gridSize || defaultGridSize);
}

resetBtn.addEventListener('click', resetSquares); 

// Create and append squares to squaresContainer
function createSquares(gridSize) {
  squaresContainer.textContent = '';
  for (let i = 1; i <= gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.textContent = `${i}`;
    // 25rem is the squaresContainer's width & height
    square.style.width = `calc(25rem / ${gridSize})`;
    square.style.height = `calc(25rem / ${gridSize})`;
    square.addEventListener('mousedown', sketch, {once: true});
    square.classList.add('square', 'center');    
    squaresContainer.append(square);
  }
}

// Change bg color of square
function sketch(e) {
  e.preventDefault();
  console.log('sketch, event is:', e.type, 'key:', e.buttons);
  let square = e.target;
  // square.textContent = '';
  // Only responds to left mousedown || mouseover
  if (e.buttons === 1) {
    square.style.backgroundColor = 'pink';
  }
}

// mousedown on squaresContainer, add event listener to each square
squaresContainer.addEventListener('mousedown', addEventListenerToSquares, true);

function addEventListenerToSquares(e) {
  console.log('sC mousedown addEL, event is:', e.type, 'key:', e.buttons);
  e.preventDefault();
  const squares = Array.from(squaresContainer.children);
  squares.forEach(square => square.addEventListener('mouseover', sketch, {once: true}))
}

// mouseup on window, remove event listener from each square
window.addEventListener('mouseup', removeEventListenerFromSquares);

function removeEventListenerFromSquares(e) {
  console.log('window mouseup removeEL, event is:', e.type, 'key:', e.buttons);
  const squares = Array.from(squaresContainer.children);
  squares.forEach(square => square.removeEventListener('mouseover', sketch, {once: true}))
}

// Disable context menu from getting triggered in squaresContainer
squaresContainer.addEventListener('contextmenu', (e) => e.preventDefault());

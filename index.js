// Mode determines which pen to use
let mode = 'Color';

// Selectors
const squaresContainer = document.querySelector('.squares-container');
const normalBtn = document.querySelector('.normal');
const colorBtn = document.querySelector('.color');
const eraserBtn = document.querySelector('.eraser');
const inputBtn = document.querySelector('.size');
const resetBtn = document.querySelector('.reset');

// Event listeners
normalBtn.addEventListener('click', determineMode);
colorBtn.addEventListener('click', determineMode);
eraserBtn.addEventListener('click', determineMode);
inputBtn.addEventListener('click', getGridSize);
resetBtn.addEventListener('click', resetSquares);
squaresContainer.addEventListener('pointerdown', addEventListenersToSquares, true);
window.addEventListener('pointerup', removeEventListenersFromSquares);
squaresContainer.addEventListener('contextmenu', (e) => e.preventDefault());

// Create squares with default grid size
let defaultGridSize = 2;
createSquares(defaultGridSize);

// Custom grid size
let gridSize;

// Prompt custom grid size
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

function determineMode(e) {
  mode = e.target.innerText;
}

// Black
function normalPen(e) {
  e.preventDefault();
  let square = e.target;
  square.releasePointerCapture(e.pointerId);
  // Only responds to left pointerdown || pointerover
  if (e.buttons === 1) {
    square.style.backgroundColor = 'black';
  }
}

// Colorful 
function colorPen(e) {
  e.preventDefault();
  let square = e.target;
  square.releasePointerCapture(e.pointerId);
  // Only responds to left pointerdown || pointerover
  if (e.buttons === 1) {
    square.style.backgroundColor = generateRgbColor();
    decreaseBrightness(square);
  }
}

// Eraser
function erasePen(e) {
  e.preventDefault();
  let square = e.target;
  square.releasePointerCapture(e.pointerId);
  // Only responds to left pointerdown || pointerover
  if (e.buttons === 1) {
    square.style.backgroundColor = 'white';
    square.style.filter = 'brightness(1.1)';
  }
}

// Reset squares to default color
function resetSquares() {
  createSquares(gridSize || defaultGridSize);
}

// Create and append squares to squaresContainer
function createSquares(gridSize) {
  squaresContainer.textContent = '';
  let width = getComputedStyle(squaresContainer).getPropertyValue('width');
  let height = getComputedStyle(squaresContainer).getPropertyValue('height');

  for (let i = 1; i <= gridSize * gridSize; i++) {
    const square = document.createElement('div');
    square.style.width = `calc(${width} / ${gridSize})`;
    square.style.height = `calc(${height} / ${gridSize})`;
    square.style.filter = 'brightness(1.1)';
    squaresContainer.append(square);
  }
} 

function determinePen() {
  if (mode === 'Normal') return normalPen;
  if (mode === 'Color') return colorPen;
  if (mode === 'Eraser') return erasePen;
}

function addEventListenersToSquares(e) {
  console.log('sC pointerdown addEL, event is:', e.type, 'key:', e.buttons);
  e.preventDefault();
  const squares = Array.from(squaresContainer.children);
  squares.forEach(square => {
    square.addEventListener('pointerdown', determinePen());
    square.addEventListener('pointerover', determinePen());
  })
}

function removeEventListenersFromSquares(e) {
  console.log('window pointerup removeEL, event is:', e.type, 'key:', e.buttons);
  const squares = Array.from(squaresContainer.children);
  squares.forEach(square => {
    square.removeEventListener('pointerdown', determinePen());
    square.removeEventListener('pointerover', determinePen());
  })
}

function generateRgbNumber() {
  return Math.floor(Math.random() * 256);
}

function generateRgbColor() {
  return `rgb(${generateRgbNumber()}, ${generateRgbNumber()}, ${generateRgbNumber()})`;
}

// Decrease brightness by 10 percent 
function decreaseBrightness(square) {
  const pattern = /\((.*)\)/;
  const currBrightnessVal = Number(getComputedStyle(square).getPropertyValue('filter').match(pattern)[1]);

  // If min brightness
  if (!currBrightnessVal) {
    return;
  };

  const newBrightnessVal = currBrightnessVal - 0.1;
  square.style.filter = `brightness(${newBrightnessVal})`;
}

// Footer
const footerText = document.querySelector('.footer-text');
const currDate = new Date().getFullYear();
footerText.textContent = `Copyright Ⓒ ${currDate} Terence`;
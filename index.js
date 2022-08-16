// Mode determines which pen to use
let mode = 'Color';

// Custom grid size
let gridSize;

// Selectors
const squaresContainer = document.querySelector('.squares-container');
const normalBtn = document.querySelector('.normal');
const colorBtn = document.querySelector('.color');
const eraserBtn = document.querySelector('.eraser');
const resetBtn = document.querySelector('.reset');
const sliderText = document.querySelector('.slider-text');
const slider = document.querySelector('.slider');

// Event listeners
normalBtn.addEventListener('click', determineMode);
colorBtn.addEventListener('click', determineMode);
eraserBtn.addEventListener('click', determineMode);
resetBtn.addEventListener('click', resetSquares);
squaresContainer.addEventListener('pointerdown', addEventListenersToSquares, true);
window.addEventListener('pointerup', removeEventListenersFromSquares);
squaresContainer.addEventListener('contextmenu', (e) => e.preventDefault());
slider.addEventListener('pointerdown', increaseOpacity);
slider.addEventListener('input', getGridSize);
slider.addEventListener('pointerup', decreaseOpacityAndCreateSquares);

// Create squares with default grid size
let defaultGridSize = 10;
createSquares(defaultGridSize);

function increaseOpacity(e) {
  e.target.classList.add('full-opacity');
}

function getGridSize(e) {
  gridSize = e.target.value;
  sliderText.innerText = `Grid Size: ${gridSize} x ${gridSize}`;
}

function decreaseOpacityAndCreateSquares(e) {
  e.target.classList.remove('full-opacity');
  createSquares(gridSize);
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
    square.style.filter = 'brightness(1.1)';
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
  squaresContainer.innerText = '';
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
  // console.log('squaresContainer addEL, event is:', e.type, 'key:', e.buttons);
  e.preventDefault();
  const squares = Array.from(squaresContainer.children);
  squares.forEach(square => {
    square.addEventListener('pointerdown', determinePen());
    square.addEventListener('pointerover', determinePen());
  })
}

function removeEventListenersFromSquares(e) {
  // console.log('window removeEL, event is:', e.type, 'key:', e.buttons);
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
footerText.innerText = `Copyright Ⓒ ${currDate} Terence`;
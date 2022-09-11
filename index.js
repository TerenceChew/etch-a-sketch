// Mode determines which pen to use
let mode = 'color';

// Custom grid size
let gridSize;

// Default settings
let inputColor = '#ffb01e';
let showLines = false;

// Selectors
const squaresContainer = document.querySelector('.squares-container');
const colorInput = document.querySelector('.color-input');
const eraserBtn = document.querySelector('.eraser');
const rainbowBtn = document.querySelector('.rainbow');
const linesBtn = document.querySelector('.lines');
const resetBtn = document.querySelector('.reset');
const sliderSpan = document.querySelector('.slider-text span');
const slider = document.querySelector('.slider');

// Event listeners
colorInput.addEventListener('input', getInputColor);
colorInput.addEventListener('click', determineMode);
eraserBtn.addEventListener('click', determineMode);
rainbowBtn.addEventListener('click', determineMode);
linesBtn.addEventListener('click', toggleLines);
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
  sliderSpan.innerText = ` ${gridSize} x ${gridSize}`;
}

function setBtnStyle(mode) {
  if (mode === 'eraser') {
    eraserBtn.style.color = 'white';
    rainbowBtn.style.color = 'black';
  } else if (mode === 'rainbow') {
    eraserBtn.style.color = 'black';
    rainbowBtn.style.color = 'white';
  } else {
    eraserBtn.style.color = 'black';
    rainbowBtn.style.color = 'black';
  }
}

function decreaseOpacityAndCreateSquares(e) {
  e.target.classList.remove('full-opacity');
  createSquares(gridSize);
}

function getInputColor(e) {
  inputColor = e.target.value;
}

function determineMode(e) {
  mode = e.target.id;

  setBtnStyle(mode);
}

// Single Color
function colorPen(e) {
  e.preventDefault();
  let square = e.target;
  square.releasePointerCapture(e.pointerId);
  // Only responds to left pointerdown || pointerover
  if (e.buttons === 1) {
    square.style.backgroundColor = `${inputColor}`;
    square.style.filter = 'brightness(1.1)';
  }
}

// Colorful 
function rainbowPen(e) {
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

// Toggle lines
function toggleLines() {
  showLines = !showLines;
  let currSquares = document.querySelectorAll('.squares-container div');
  
  currSquares.forEach(square => {
    square.classList.toggle('lines');
  })

  squaresContainer.classList.toggle('borders');
}

// Reset squares to default color
function resetSquares() {
  let currSquares = document.querySelectorAll('.squares-container div');

  currSquares.forEach(square => {
    square.classList.add('animate');
  })

  setTimeout(() => {
    createSquares(gridSize || defaultGridSize);
  }, 1500);
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

  if (showLines) {
    let currSquares = document.querySelectorAll('.squares-container div');

    currSquares.forEach(square => {
      square.classList.add('lines');
    })

    squaresContainer.classList.add('borders');
  } else {
    squaresContainer.classList.remove('borders');
  }
} 

function determinePen() {
  if (mode === 'color') return colorPen;
  if (mode === 'rainbow') return rainbowPen;
  if (mode === 'eraser') return erasePen;
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
const currYearSpan = document.querySelector('.curr-year');
const currYear = new Date().getFullYear();
currYearSpan.innerText = `${currYear}`;
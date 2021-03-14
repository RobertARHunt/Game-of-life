window.requestAnimationFrame(firstFrame);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const canvasSize = 1000;
const cellSize = 5;
const gridSize = Math.floor(canvasSize / cellSize);
let density = 0.4;
let playing = true;
let grid = newGrid();

ctx.fillStyle = 'blue';

function drawPixel (x, y) {
    ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
}

function clear () {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function draw(){
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[x][y]) {
                drawPixel(x, y);
            }
        }
    }
}

function firstFrame() {
    clear();
    draw();
    queueNextFrame();
}

function nextFrame() {
    updateGrid();
    clear();
    draw();
    queueNextFrame();
}

function queueNextFrame() {
    if (playing) {
        setTimeout(nextFrame, 50);
    }
    // setTimeout(nextFrame, 50);
    // window.requestAnimationFrame(nextFrame);
}

function updateGrid() {
    const newGrid = [];
    for (let x = 0; x < gridSize; x++) {
        newGrid[x] = [];
        for (let y = 0; y < gridSize; y++) {
            let liveNeighbours = countLiveNeighbours(x, y);
            if (liveNeighbours == 3) {
                newGrid[x][y] = true;
            } else if (liveNeighbours == 2) {
                if (grid[x][y]) {
                    newGrid[x][y] = true;
                } else {
                    newGrid[x][y] = false;
                }
            } else {
                newGrid[x][y] = false;
            }
        }
    }
    grid = newGrid;
}

function newGrid() {
    const grid = [];
    for (let x = 0; x < gridSize; x++) {
        grid[x] = [];
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = Math.random() < density;
        }
    }
    return grid;
}

function playPause() {
    if (playing) {
        playing = false;
    } else {
        playing = true;
        queueNextFrame();
    }
}

function countLiveNeighbours(x, y) {
    return neighbours.map(
        ({ dx, dy }) => isAlive(x + dx, y + dy) ? 1 : 0
    ).reduce(sum);
}

function isAlive(x, y) {
    return grid[(x + gridSize) % gridSize][(y + gridSize) % gridSize];
}
    
const neighbours = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 }
];

const sum = (accumulator, currentValue) => accumulator + currentValue;
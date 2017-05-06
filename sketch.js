var img;

var stack = [];

var current;

var cols, rows;
var w = 10;
var grid = [];

function preload() {
  img = loadImage("assets/2017.png");
}

function setup() {
  var myCanvas = createCanvas(900, 400);
  myCanvas.parent("canvasContainer");
  pixelDensity(1);
  background(img);
  loadPixels();

  rows = floor(height/w);
  cols = floor(width/w);

  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      if(whiteSpot(i * w, j * w)) {
        var cell = new Cell(i, j);
        grid.push(cell);
      }
    }
  }

  current = grid[0];
}

function draw() {
  background(44, 62, 80);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  } else if (stack.length == 0) {
    for (i = 0; i < grid.length; i++) {
      if (!grid[i].visited) {
        current = grid[i];
        break;
      }
    }
  }
}

function whiteSpot(x, y){
  var count = 0;

  for (var i = 0; i < w; i++) {
    for (var j = 0; j < w; j++) {

      var index = (x + i + (y + j) * width)*4;
      var red = pixels[index];

      if (red > 0) {
        count++;
      }
    }
  }

  if (count > 10) {
    return true;
  } else {
    return false;
  }
}

function index(i, j) {
  for (k = 0; k < grid.length; k++) {
    if (grid[k].i == i && grid[k].j == j) {
      return k;
    }
  }
  return -1;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

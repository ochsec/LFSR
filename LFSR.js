const N = 11;
var seed = [] /* seed array */,
    r1 = []/* Register 1 array */, 
    r2 = []/* Register 2 array */, 
    count = 0 /* counts steps */, 
    S = [] /* holds seed value */, 
    R = [] /* holds register value */;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(0.08 * windowHeight);
  frameRate(2);  // 2 iterations per second
  for (let i = 0; i < N; i++) {
    seed.push(Math.floor(Math.random() * 2));
  }
  r1 = seed;                // Transfer seed values to register 1
  S = translator(seed);     // Sum up the values of the seed register
  count = 0;                // Counter for number of steps
}


function draw() {
  r2 = update(r1);       // Update register 2 with XOR
  r1 = r2;
  R = translator(r2);
  count++;
  background(200);
  display();
}

function display() {
  let brickWidth = windowWidth/11;
  let brickHeight = (6/36)*windowHeight;
  textSize(0.06 * windowHeight);
  rectMode(CORNER);
  for (let i = 0; i < seed.length; i++) {
    if (seed[i] == 0) {
      fill(255);
      rect(i * brickWidth, (1/3) * windowHeight, brickWidth, brickHeight);
      fill(75);
      text("" + 2 ** i, i * brickWidth + brickWidth/8, 1/3*windowHeight + 1/2*brickHeight);  
    }
    else if (seed[i] == 1) {
      fill(75);
      rect(i * brickWidth, (1/3) * windowHeight, brickWidth, brickHeight);
      fill(255);
      text("" + 2 ** i, i * brickWidth + brickWidth/8, 1/3*windowHeight + 1/2*brickHeight);  
    }
    
  }
  for (let i = 0; i < r2.length; i++) {
    if (r2[i] == 0) {
      fill(255, 0, 0);
      rect(i * brickWidth, (1/3) * windowHeight + brickHeight, brickWidth, brickHeight);
      fill(125, 0, 0);
      text("" + 2 ** i, i * brickWidth + brickWidth/8, 1/3*windowHeight + 3/2*brickHeight); 
    } else if (r2[i] == 1) {
      fill(125, 0, 0);
      rect(i * brickWidth, (1/3) * windowHeight + brickHeight, brickWidth, brickHeight); 
      fill(255, 0, 0);
      text("" + 2 ** i, i * brickWidth + brickWidth/8, 1/3*windowHeight + 3/2*brickHeight);
    }
  }
  fill(20);
  text("Seed = " + S, 0.32 * windowWidth, brickHeight);
  fill(125, 0, 0);
  text("Step " + count + ": " + R, 0.32 * windowWidth, 0.83 * windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Update register 2 and XOR between registers 8 & 10 (decider function).
function update(r) {
  var r_temp = [];                        // Temporary array for function
  for (let i = 0; i < N; i++) { r_temp.push(0); }
  r_temp[0] = decider(r[8], r[10]);          // Apply decider logic, returns
  for (let i = 1; i < r.length; i++) {    // an integer which is inserted
    r_temp[i] = r[i-1];                   // in register position 1, shift
  }                                       // other values forward 1 position.
  
  return r_temp;
}

/* Function for creating a sum from translating 
  bits from the incoming array. */
function translator(arr) {
  var n = 0;
  if (arr[0] == 1) { n += 1; }
  if (arr[1] == 1) { n += 2; }
  if (arr[2] == 1) { n += 4; }
  if (arr[3] == 1) { n += 8; }
  if (arr[4] == 1) { n += 16; }
  if (arr[5] == 1) { n += 32; }
  if (arr[6] == 1) { n += 64; }
  if (arr[7] == 1) { n += 128; }
  if (arr[8] == 1) { n += 256; }
  if (arr[9] == 1) { n += 512; }
  if (arr[10] == 1) { n += 1024; }
  return n;
}

// Make XOR comparison between register 1 positions 8 & 10
function decider(a, b) {
  var c = 2;
  if ((a == 0 && b == 0) || (a == 1 && b == 1)) {
    c = 0; 
  }
  else if ((a == 0 && b == 1) || (a == 1 && b == 0)) {
    c = 1;  
  }
  return c;
}

function reseed(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 2);
  }
  return arr;
}

function mousePressed() {
  seed = reseed(seed);
  S = translator(seed);
  count = 0;
}

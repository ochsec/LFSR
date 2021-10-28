const N = 11;
var seed = [] /* seed array */,
    r1 = []/* Register 1 array */, 
    r2 = []/* Register 2 array */, 
    count = 0 /* counts steps */, 
    S = [] /* holds seed value */, 
    R = [] /* holds register value */;
var COLORS;

function setup() {
  createCanvas(480, 260);
  textFont('Courier New');
  textSize(16);
  frameRate(2);  // 2 iterations per second

  COLORS = {
    BACKGROUND: color(46, 46, 46),
    COMMENTS: color(121, 121, 121),
    WHITE: color(214, 214, 214),
    GREEN: color(180, 210, 115),
    ORANGE: color(232, 125, 62),
    PURPLE: color(158, 134, 200),
    PINK: color(176, 82, 121),
    BLUE: color(108, 153, 187),
    WHITE_LITE: color('rgba(214, 214, 214, 0.5)'),
    GREEN_LITE: color('rgba(180, 210, 115, 0.5)'),
    ORANGE_LITE: color('rgba(232, 125, 62, 0.5)'),
    PURPLE_LITE: color('rgba(158, 134, 200, 0.5)'),
    PINK_LITE: color('rgba(176, 82, 121, 0.5)'),
    BLUE_LITE: color('rgba(108, 153, 187, 0.5)'),
  };

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
  background(COLORS.BACKGROUND);
  display();
}

function display() {
  rectMode(CORNER);
  for (let i = 0; i < seed.length; i++) {
    if (seed[i] == 0) {
      fill(COLORS.BACKGROUND);
      stroke(COLORS.GREEN);
      rect(i*42, 3*42, 42, 42);
    }
    else if (seed[i] == 1) {
      fill(COLORS.GREEN_LITE);
      stroke(COLORS.GREEN);
      rect(i*42, 3*42, 42, 42);
    }
    
  }
  for (let i = 0; i < r2.length; i++) {
    if (r2[i] == 0) {
      fill(COLORS.BACKGROUND);
      stroke(COLORS.BLUE);
      rect(i*42, 4*42, 42, 42);
    } else if (r2[i] == 1) {
      fill(COLORS.BLUE_LITE);
      stroke(COLORS.BLUE);
      rect(i*42, 4*42, 42, 42);
    }
  }
  fill(COLORS.GREEN);
  stroke(COLORS.COMMENTS);
  text("Seed = " + S, 10, 2*42 + 21);
  fill(COLORS.BLUE);
  stroke(COLORS.COMMENTS);
  text("Step " + count + ": " + R, 10, 6*42 - 21);
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

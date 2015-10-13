int N = 11;  // Num of registers
int[] seed = new int[N];  // Seed array
int[] r1 = new int[N];    // Register 1 array
int[] r2 = new int[N];    // Register 2 array
int count, S, R;          // count counts steps, S holds seed value, R holds register value

void setup() {
  size(660, 360);
  textSize(28);
  frameRate(2);           // 2 iterations per second
  for (int i = 0; i < seed.length; i++) {
    seed[i] = floor(random(2));      // Fill seed register with pseudo-random numbers
  }
  r1 = seed;             // transfer seed values to register 1
  S = translator(seed);  // Sum up the values of the seed register
  count = 0;             // counter for number of steps
}

void draw() {
  r2 = update(r1);      // update register 2 with XOR
  r1 = r2;              // copy to register 1 which is displayed
  R = translator(r2);   // update register value
  count++;              // increment step
  background(200);
  display();
}

// update register 2 and use XOR between registers 8 & 10 (decider function)
int[] update(int[] r) {
  int[] r_temp = new int[N];            // r_temp - temporary array for function
  r_temp[0] = decider(r[8], r[10]);     // apply decider logic, returns an int which is
  for (int i = 1; i < r.length; i++) {  // inserted in register position 1
    r_temp[i] = r[i-1];                 // shift other values forward by 1 position
  }
  return r_temp;                        // return the whole array
}

// Draw seed and register box arrays and fill if value is 1
// Draw text showing seed and register sum values
void display() {
  rectMode(CORNER);
  for (int i = 0; i < seed.length; i++) {
    if (seed[i] == 0) {
      fill(225);
      rect(i*60, 120, 60, 60);
    }
    else if (seed[i] == 1) {
      fill(75);
      rect(i*60, 120, 60, 60);
    }
  }
  for (int j = 0; j < r2.length; j++) {
    if (r2[j] == 0) {
      fill(225, 0, 0);
      rect(j*60, 180, 60, 60);    
    }
    else if (r2[j] == 1) {
      fill(125, 0, 0);
      rect(j*60, 180, 60, 60);
    }      
  }
  fill(20);
  text("Seed = " + S, 210, 60);
  fill(125, 0, 0);
  text("Step " + count + ": " + R, 210, 300);
}

// Make XOR comparison between register 1 positions 8 & 10
int decider(int a, int b) {
  int c;
  if ( (a == 0 && b == 0) || (a == 1 && b == 1) ) {
    c = 0;
  }
  else if ( (a == 0 && b == 1) || (a == 1 && b == 0) ) {
   c = 1;
  }
  else {
   c = 2;
  }
  return c; 
}

// function for summing bits in array
int translator(int[] arr) {
  int n = 0;
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

// reset seed array with new random values
int[] reseed(int[] arr) {
  for (int i = 0; i < arr.length; i++) {
    arr[i] = floor(random(2));
  }    
  return arr;
}

void mousePressed() {
  seed = reseed(seed);
  S = translator(seed);
  count = 0;
}
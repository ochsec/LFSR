int N = 11;
int[] seed = new int[N];
int[] r1 = new int[N];
int[] r2 = new int[N];
int count, S, R;

void setup() {
  frameRate(3);
  size(220, 120);
  for (int i = 0; i < seed.length; i++) {
    seed[i] = floor(random(2));
  }
  r1 = seed;
  S = translator(seed);
  count = 0;
}

void draw() {
  r2 = update(r1);
  r1 = r2;
  R = translator(r2);
  count++;
  background(200);
  display();
}

int[] update(int[] r) {
  int[] r_temp = new int[N];
  r_temp[0] = decider(r[8], r[10]);
  for (int i = 1; i < r.length; i++) {
    r_temp[i] = r[i-1];
  }
  return r_temp;
}

void display() {
  rectMode(CORNER);
  for (int i = 0; i < seed.length; i++) {
    if (seed[i] == 0) {
      fill(225);
      rect(i*20, 40, 20, 20);
    }
    else if (seed[i] == 1) {
      fill(75);
      rect(i*20, 40, 20, 20);
    }
  }
  for (int j = 0; j < r2.length; j++) {
    if (r2[j] == 0) {
      fill(225, 0, 0);
      rect(j*20, 60, 20, 20);    
    }
    else if (r2[j] == 1) {
      fill(125, 0, 0);
      rect(j*20, 60, 20, 20);
    }      
  }
  fill(20);
  text("Seed = " + S, 70, 20);
  fill(125, 0, 0);
  text("Step " + count + ": " + R, 70, 110);
}

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

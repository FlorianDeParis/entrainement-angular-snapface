// Get a random number between 0 (included) and 1 (exluded)
export function getRandom(): number {
  return Math.random();
}

// Get a random number between min val (included) and max (exluded)
export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Get a random int number val (included) and max (included)
export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

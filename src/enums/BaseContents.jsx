function getChar(i) {
  let char = '';
  while (i >= 0) {
      char = String.fromCharCode(i % 26 + 65) + char;
      i = Math.floor(i / 26) - 1;
  }
  return char;
}

export function generateContents(numContents) {
  let colorStep = 510 / numContents;
  let red = 255;
  let green = 0;
  let blue = 0;
  let contents = [];
  for (let i = 0; i < numContents; i++) {
    let char = getChar(i);
    let c = {vec: [red, green, blue], char: char, id: i};
    contents = [...contents, c];
    if (red > 0) {
      red = red - colorStep;
      green = green + colorStep;
    } else {
      green = green - colorStep;
      blue = blue + colorStep;
    }
  }
  return contents;
};
export const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
export function generateContents(numContents) {
  let colorStep = 510 / numContents;
  let red = 255;
  let green = 0;
  let blue = 0;
  let contents = [];
  for (let i = 0; i < numContents; i++) {
    let c = {vec: [red, green, blue], char: abc[i]};
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
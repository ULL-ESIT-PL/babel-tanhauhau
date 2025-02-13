let arr = [
  2, 4, 6,
  else (i) => `default ${i}`
];

let result = "";
arr.forEach((x) => {
  result += x;
});
console.log(result);  // "246"

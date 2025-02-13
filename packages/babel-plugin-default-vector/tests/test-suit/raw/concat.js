let arr1 = [
  1, 2,
  else (i) => `default ${i}`
];

let arr2 = [
  3, 4,
  else (i) => `default 2 ${i}`
];

let concated = arr1.concat(arr2);  // Concatena los dos DefaultVector
console.log(concated[0]);          // 1
console.log(concated[1]);          // 2
console.log(concated[2]);          // 3
console.log(concated[3]);          // 4
console.log(concated[4]);          // fuera de rango → "default 4"

let arr = [5, 2, 8, else (i) => i * 10];
let sorted = arr.sort((a, b) => a - b);
console.log(sorted[0]); // 2
console.log(sorted[3]); // 30
console.log(sorted[4]); // 40 

let reversed = arr.reverse();
console.log(reversed[0]); // 8
console.log(reversed[3]); // 30
console.log(reversed[4]); // 40
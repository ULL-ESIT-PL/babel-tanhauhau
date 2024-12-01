let a = [1, 2, 3, else x => x * x];
let b = [4,5,6];

console.log(a[2]);  // 3
console.log(a[5]);  // 25 (porque 5 * 5 = 25)
let c = b.concat(a);
console.log(c);  // [1, 2, 3, 4, 5, 6]
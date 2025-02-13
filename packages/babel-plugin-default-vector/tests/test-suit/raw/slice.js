let arr = [
  10, 20, 30, 40, 50,
  else (i) => `default ${i}`
];

let sliced = arr.slice(1, 4);  // Extrae índices 1,2,3 → [20, 30, 40]
console.log(sliced.length);    // 3
console.log(sliced[0]);        // 20
console.log(sliced[1]);        // 30
console.log(sliced[2]);        // 40
console.log(sliced[3]);        // fuera de rango → "default 3"

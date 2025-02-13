let temperatures = [
  25, 30, 28,
  else (index) => `No data for day ${index + 1}`
];

// Se añade un dato en un día específico
temperatures[5] = 26;

console.log(temperatures[0]); // 25
console.log(temperatures[3]); // índice 3 no definido: "No data for day 4"
console.log(temperatures[5]); // 26
console.log(temperatures[4]); // índice 4 no definido: "No data for day 5"

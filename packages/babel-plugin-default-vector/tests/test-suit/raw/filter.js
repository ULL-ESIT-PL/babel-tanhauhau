let arr = new DefaultVector([
  5, 10, 15, 20], checkUndefined=false);
arr.setCheckUndefined(true)
arr.setElseExpression(i => 100 + i);

let filtered = arr.filter(x => x > 10);  // [15, 20]
console.log(filtered.length);            // 2
console.log(filtered[0]);                // 15
console.log(filtered[1]);                // 20
console.log(filtered[2]);                // fuera de rango → 100 + 2 = 102

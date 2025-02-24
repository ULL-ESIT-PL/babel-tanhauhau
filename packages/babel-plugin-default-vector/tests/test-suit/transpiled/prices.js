const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let prices = new DefaultVector([99, 199, 299], i => 100);
let discountPrices = prices.map(price => price - 20);
discountPrices.setElseExpression(i => 80);
console.log(discountPrices[0]); // 79

console.log(discountPrices[3]); // 100 (default)
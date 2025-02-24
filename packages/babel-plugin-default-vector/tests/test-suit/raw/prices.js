let prices = [99, 199, 299, else (i) => 100];

let discountPrices = prices.map(price => price - 20);
discountPrices.setElseExpression(i => 80);

console.log(discountPrices[0]); // 79
console.log(discountPrices[3]); // 100 (default)

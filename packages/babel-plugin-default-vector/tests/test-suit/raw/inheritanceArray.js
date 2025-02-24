let fn = (x) => x * x;
let array = new DefaultObject([1, 2, 3], fn, true);
let arraySon = Object.create(array);
console.log(arraySon)
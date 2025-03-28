let fn = (x) => x * x;
let padre = new DefaultVector([1, 2, 3], fn);
let arraySon = Object.create(padre);
debugger;
console.log(arraySon); // DefaultVector {}
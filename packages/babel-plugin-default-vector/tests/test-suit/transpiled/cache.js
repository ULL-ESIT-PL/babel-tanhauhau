const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let cache = new DefaultObject({}, key => `Fetching ${key}...`);
console.log(cache.user123); // "Fetching user123..."
cache.user123 = {
  name: "Alice",
  age: 25
};
console.log(cache.user123); // { name: "Alice", age: 25 }
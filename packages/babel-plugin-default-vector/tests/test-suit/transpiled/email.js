const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let users = new DefaultVector([{
  name: "Alice",
  email: "alice@example.com"
}, {
  name: "Bob",
  email: "bob@example.com"
}], index => ({
  name: "Guest",
  email: "guest@example.com"
}));
console.log(users[3]); // { name: 'Guest', email: 'guest@example.com' } -> Función else por defecto

console.log(users[1]); // { name: 'Bob', email: 'bob@example.com' } -> Usuario encontrado
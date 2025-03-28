const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let user = new DefaultObject({
  name: "John",
  email: "john.doe@example.com"
}, key => `User ${key} not provided`);
console.log(user.name); // "John"
console.log(user.email); // "john.doe@example.com"
console.log(user.address); // "User address not provided"
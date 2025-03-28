const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let deepObj = new DefaultObject({
  users: new DefaultObject({}, key => `User ${key} not found`)
});
console.log(deepObj.users.Alice); // "User Alice not found"
deepObj.users.Alice = {
  age: 30
};
console.log(deepObj.users.Alice); // { age: 30 }
const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let handler = {
  get(target, prop) {
    if (prop in target) return target[prop];
    return `Missing ${prop}`;
  }

};
let proxyObj = new Proxy(new DefaultObject({}, key => `Not found: ${key}`), handler);
console.log(proxyObj.name); // "Not found: name"

console.log(proxyObj.age); // "Not found: age"

proxyObj.name = "Bob";
console.log(proxyObj.name); // "Bob"

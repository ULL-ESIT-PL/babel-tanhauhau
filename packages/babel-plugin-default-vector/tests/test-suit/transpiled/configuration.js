const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let config = new DefaultObject({
  apiEndpoint: "https://api.example.com",
  timeout: 5000
}, key => `Config key "${key}" missing`);
console.log(config.apiEndpoint); // "https://api.example.com"
console.log(config.timeout); // 5000
console.log(config.maxRetries); // "Config key 'maxRetries' missing"
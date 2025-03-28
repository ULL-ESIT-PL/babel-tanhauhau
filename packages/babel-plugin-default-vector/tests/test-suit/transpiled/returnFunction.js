const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let obj = new DefaultObject({
  getData: () => ({
    key: "value"
  })
});
console.log(obj.getData()); // Debe devolver un DefaultObject en lugar del objeto normal
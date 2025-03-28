const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let fn = x => {
  return x;
};
let arr = new DefaultVector([1, 2, 3], fn);
try {
  arr.setCheckfn(true);
} catch (e) {
  console.log(e.message); // arr.setCheckfn is not a function
}
const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let a = new DefaultVector([1, 2, 3], x => "Secret Information in " + x);
a.setCheckfn(x => {
  return x === 3;
});
console.log(a[1]); // 2

console.log(a[2]); // Secret Information in 2

console.log(a[3]); // Secret Information in 3
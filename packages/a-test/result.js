const {
  assign,
  functionObject
} = require("../babel-plugin-left-side-support"); // Changed manually until the module is published

const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);

console.log(foo(10)); // 5
console.log(foo(40)); // 40 * 2 = 80
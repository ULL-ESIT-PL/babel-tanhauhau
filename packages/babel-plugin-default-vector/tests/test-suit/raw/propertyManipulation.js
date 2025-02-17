let defaultFn = (key) => key + " undefined";
let obj = new DefaultObject({
  a: 1,
  b: 2
}, defaultFn, true);

console.log(obj.a); // 1
obj.a = 10;
console.log(obj.a); // 10
obj.c = 3;
console.log(obj.c); // 3
delete obj.b;
console.log(obj.b); // "b undefined" (se invoca el default)

Object.defineProperty(obj, 'd', {
  value: 4,
  writable: true,
  enumerable: true
});
console.log(obj.d); // 4
obj.d = 40;
console.log(obj.d); // 40
let newObj = Object.assign({}, obj);
console.log(newObj.a); // 10
console.log(newObj.b); // undefined (propiedad borrada)
console.log(newObj.c); // 3
console.log(newObj.d); // 40

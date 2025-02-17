let defaultFn = (key) => key + " not available";
let obj = new DefaultObject({
  a: "A",
  b: undefined
}, defaultFn, true);

// Agregamos propiedad no enumerable
Object.defineProperty(obj, 'hidden', {
  value: "secret",
  enumerable: false
});
const sym = Symbol('sym');
obj[sym] = "symbol value";
let inKeys = "";
for (let key in obj) {
  inKeys += key + ",";
}
console.log(inKeys.slice(0, inKeys.length - 1)); // "a,b"
console.log(Object.getOwnPropertyNames(obj).join(',')); // "a,b,hidden"
console.log(Object.getOwnPropertySymbols(obj).map(s => s.toString()).join(',')); // "Symbol(sym)"
console.log(obj.hidden); // "secret" (acceso directo a propiedad no enumerable)
console.log(obj.nonExistent); // "nonExistent not available" (propiedad inexistente)

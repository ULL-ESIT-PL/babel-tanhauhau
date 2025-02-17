let elseExpression = (key) => key + " not found";
let obj = new DefaultObject({
  a: "Alpha",
  b: "Beta",
  c: undefined,
  d: null,
}, elseExpression, true);

console.log(obj.a); // "Alpha"
console.log(obj.b); // "Beta"
console.log(obj.c); // "c not found"  (ya que c es undefined)
console.log(obj.d); // null (valor definido, aunque sea null)
console.log(obj.e); // "e not found"  (propiedad inexistente)
let elsefn = (x) => {throw new Error(`Intento de acceso a un elemento inexistente: ${x}`)};
let object = {
  "a": 1,
  "b": 2,
  else elsefn
}

try {
  console.log(object.c)
} catch (e) {
  console.log(e.message); // Intento de acceso a un elemento inexistente: c
}
let anotherfn = (x) => {return x};
  object.setElseExpression(anotherfn);

console.log(object.estoEsOtroAcceso); // c
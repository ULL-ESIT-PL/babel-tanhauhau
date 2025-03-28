const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
function generarClaveSecreta(longitud = 16) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let claveSecreta = '';
  for (let i = 0; i < longitud; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    claveSecreta += caracteres[randomIndex];
  }
  return claveSecreta;
}
let clavesSecretas = [];
for (let i = 0; i < 5; i++) {
  clavesSecretas.push(generarClaveSecreta());
}
let keys = new DefaultObject({
  "Ava": "jnf83",
  "Sofia": "?d[3a",
  "Root": clavesSecretas[0]
}, x => `Error, intento de acceso a una clave secreta: ${x}`);
let checkfn = x => {
  for (let clave of clavesSecretas) {
    if (x === clave) {
      return true;
    }
  }
  return false;
};
keys.setCheckfn(checkfn);
console.log(keys.Ava); // jnf83
console.log(keys.Sofia); // ?d[3a
console.log("Root" in keys); // true
console.log(checkfn(keys.Root)); // false
console.log(keys.Root); // Error, intento de acceso a una clave secreta: Root
keys.setCheckInside(false);
console.log(checkfn(keys.Root)); // true
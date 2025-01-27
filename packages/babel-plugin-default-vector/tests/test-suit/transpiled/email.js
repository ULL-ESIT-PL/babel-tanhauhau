function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
}

let users = new Proxy([{
  name: "Alice",
  email: "alice@example.com"
}, {
  name: "Bob",
  email: "bob@example.com"
}], {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  get: function (target, prop) {
    if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
    if (typeof target[prop] === "function") return function (...args) {
      return target[prop].apply(target, args);
    };
    if (typeof target[prop] === "string") return target[prop];
    if (isNumeric(prop) && prop < target.length && prop >= 0) return target[prop];
    return (index => ({
      name: "Guest",
      email: "guest@example.com"
    }))(prop);
  }
});
console.log(users[3]); // { name: 'Guest', email: 'guest@example.com' } -> Función else por defecto

console.log(users[1]); // { name: 'Bob', email: 'bob@example.com' } -> Usuario encontrado
let users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  else (index) => ({ name: "Guest", email: "guest@example.com" })
];

console.log(users[3]);  // { name: 'Guest', email: 'guest@example.com' } -> Función else por defecto
console.log(users[1]);  // { name: 'Bob', email: 'bob@example.com' } -> Usuario encontrado

let user = {
  name: "John",
  email: "john.doe@example.com",
  else (key) => `User ${key} not provided`
};

console.log(user.name);   // "John"
console.log(user.email);  // "john.doe@example.com"
console.log(user.address); // "User address not provided"

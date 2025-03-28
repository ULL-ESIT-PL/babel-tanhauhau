let cache = new DefaultObject({}, key => `Fetching ${key}...`);
console.log(cache.user123); // "Fetching user123..."
cache.user123 = { name: "Alice", age: 25 };
console.log(cache.user123); // { name: "Alice", age: 25 }
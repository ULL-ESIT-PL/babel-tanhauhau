let array = [1, 2, 3, else x => x * x];

let anotherInstance = Array.from(array);

console.log(anotherInstance); // [ 1, 2, 3 ]
console.log(anotherInstance[3]); // undefined
console.log(array[3]); // 9
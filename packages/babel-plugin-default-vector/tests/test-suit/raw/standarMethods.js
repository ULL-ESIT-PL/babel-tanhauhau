let defaultFn = (key) => key + " missing";
let obj = new DefaultObject({
  x: 10,
  y: undefined,
  z: "Zeta"
}, defaultFn, true);

console.log(Object.keys(obj).join(',')); // "x,y,z"
console.log(Object.values(obj).join(',')); // "10, missing, Zeta"
console.log(Object.entries(obj)
  .map(pair => pair.join(':'))
  .join(',')); // "x:10,y:y missing,z:Zeta"
console.log(obj.hasOwnProperty('x')); // true
console.log(obj.hasOwnProperty('y')); // true 
console.log(obj.hasOwnProperty('w')); // false
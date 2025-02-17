let elseExpression = (date) => {
  let unknown =  date + " do not have an event";
  return unknown;
}
let calendar = new DefaultObject({
  1: "New Year's Day",
  2: "Valentine's Day",
  3: undefined,
  "navidad": undefined,
}, elseExpression, true);

console.log(calendar[1]);
console.log(calendar[5]);
console.log(calendar[3]);
console.log(calendar["navidad"]);

let calendar2 = {
  "1": "New Year's Day",
  "2": "Valentine's Day",
}


console.log(calendar["1"]);
console.log(calendar["5"]);
console.log(calendar2["1"]);
console.log(calendar2["5"]);

let calendar3 = [1,2,3, else elseExpression];

console.log(calendar3[0]);
console.log(calendar3[3]);
let calendar4 = [1,2,3];

console.log(calendar4[0]);
console.log(calendar4[3]);
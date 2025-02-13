let elseExpression = (date) => {
  date = parseInt(date) + 1;
  let unknown = "Day " + date + " do not have an event";
  return unknown;
}
let calendar = new DefaultVector([{event: "New Year's Day", todo: "Something" }], 20, true)
// calendar[5] = { event: "Reyes Magos", todo: "Regalos" };
// let filledCalendar = calendar.map(element => {
//   if (element === undefined) {
//     return elseExpression(calendar.indexOf(element));
//   } else {
//     return element;
//   }
// })
// console.log(filledCalendar);
// filledCalendar.setElseExpression(elseExpression);
// filledCalendar.setCheckUndefined(true);
// console.log(filledCalendar);
// let noEmptyCalendar = filledCalendar.filter(Object);
let a = [1,2,3, else x => x * x];
console.log(a[3]); // 9
const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let calendar = new DefaultVector([{
  event: "New Year's Day",
  todo: "Something"
}], date => {
  //transforming the date to a number
  date = parseInt(date) + 1;
  let unknown = "Day " + date + " do not have an event";
  return unknown;
});
//Pushing a new event on an specific date
calendar[5] = {
  event: "Reyes Magos",
  todo: "Regalos"
};
console.log(calendar[3]); // Day 4 do not have an event
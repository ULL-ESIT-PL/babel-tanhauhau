function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
}

let calendar = new Proxy([{
  event: "New Year's Day",
  todo: "Something"
}], {
  [Symbol.isConcatSpreadable]: true,
  length: 1,
  get: function (target, prop) {
    if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
    if (typeof target[prop] === "function") return function (...args) {
      return target[prop].apply(target, args);
    };
    if (typeof target[prop] === "string") return target[prop];
    if (isNumeric(prop) && prop < target.length && prop >= 0) return target[prop];
    return (date => {
      //transforming the date to a number
      date = parseInt(date) + 1;
      let unknown = "Day " + date + " do not have an event";
      return unknown;
    })(prop);
  }
}); //Pushing a new event on an specific date

calendar[5] = {
  event: "Reyes Magos",
  todo: "Regalos"
};
console.log(calendar[8]); // Day 4 do not have an event

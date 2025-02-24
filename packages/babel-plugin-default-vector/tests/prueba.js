let elseExpression = (date) => {
  let unknown =  date + " do not have an event";
  return unknown;
}
let calendar = {
  1: "New Year's Day",
  2: "Valentine's Day",
  3: "Independence Day",
  "navidad": "Christmas",
  else x => elseExpression(x) 
};



 console.log(calendar["navidad"]); // New Year's Day
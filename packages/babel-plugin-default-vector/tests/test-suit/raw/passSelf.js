defaultFn = (key, obj) => obj ? `Missing ${key} in ${JSON.stringify(obj)}` : `Missing ${key}`;
let newObj = new DefaultObject({ a: 1 }, defaultFn, {checkInside: true});
console.log(newObj.b); // "Missing b in {\"a\":1}"
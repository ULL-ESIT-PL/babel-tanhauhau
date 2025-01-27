function isNumeric(n) {
  return !isNaN(n) && isFinite(n);
}

let a = new Proxy([1, 2, 3], {
  [Symbol.isConcatSpreadable]: true,
  length: 3,
  get: function (target, prop) {
    if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
    if (typeof target[prop] === "function") return function (...args) {
      return target[prop].apply(target, args);
    };
    if (typeof target[prop] === "string") return target[prop];
    if (isNumeric(prop) && prop < target.length && prop >= 0) return target[prop];
    return (x => x * x)(prop);
  }
});
console.log(a[3]); // 9

a.push(4);
console.log(a[3]); // 4
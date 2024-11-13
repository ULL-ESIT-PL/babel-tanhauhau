let a = new Proxy([1, 2, 3], {
  get: function (target, prop) {
    if (typeof target[prop] === "function") return function (...args) {
      return target[prop].apply(target, args);
    };
    if (prop < target.length) return target[prop];
    return (x => x * x)(prop);
  }
});

for (let i = 0; i < 10000000; i++) {
  a.push(5);
  a.pop();
}
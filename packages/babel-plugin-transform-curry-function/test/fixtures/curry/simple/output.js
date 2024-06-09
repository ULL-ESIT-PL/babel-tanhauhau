const foo = _currying(function (a, b, c) {
  return a + b + c;
});

function _currying(fn) { const numParamsRequired = fn.length; function curryFactory(params) { return function (...args) { const newParams = params.concat(args); if (newParams.length >= numParamsRequired) { return fn(...newParams); } return curryFactory(newParams); }; } return curryFactory([]); }

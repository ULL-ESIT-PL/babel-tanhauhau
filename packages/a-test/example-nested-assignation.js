function @@ foo(a) {
  return function @@ bar(b) {
    return a + b;
  }
}

foo(5) = 13;
foo(6)(2) = "Another value";
console.log(foo(2)(3)); // 5
console.log(foo(5)); // 13
console.log(foo(6)); // FunctionObject
console.log(foo(6)(2)); // "Another Value". Currently returning 8.
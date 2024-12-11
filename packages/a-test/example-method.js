let a = {foo: function @@ something(a) {return a}};
a.foo("bar") = "fighter";
console.log(a.foo("x")); // x
console.log(a.foo("bar")); // fighter
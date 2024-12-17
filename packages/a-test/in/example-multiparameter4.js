function @@ foo(a, b) {
    //console.log(a, b);
    return a + b;
}

foo(1, undefined) = "Something else";
console.log(foo(1, undefined)); // "Something else"
console.log(foo(1)); // "Something else". Not working as intended?
console.log(foo(undefined)); // NaN
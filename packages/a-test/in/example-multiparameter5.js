function @@ foo(a, b) {
    //console.log(a, b);
    return a + b;
}

foo(undefined, 1) = "Something else";
foo(null, 1) = "Something something else";
console.log(foo(undefined, 1)); // "Something else"
console.log(foo(null, 1)); // "Something something else".
console.log(foo(1, 2)); // 3
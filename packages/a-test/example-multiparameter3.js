function @@ foo(a, b, c) {
    return a + b + c;
}

foo(1, undefined, 3) = "Im undefined!";
console.log(foo(1,2,3)) // 6
console.log(foo(1, undefined, 3)) // "Im undefined!"
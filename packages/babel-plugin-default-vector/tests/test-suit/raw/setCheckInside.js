let a = [1,2,3, else (x) => "Secret Information in " + x];
a.setCheckfn(x => {return x === 3});
console.log(a[1]); // 2
console.log(a[2]); // Secret Information in 2
console.log(a[3]); // Secret Information in 3
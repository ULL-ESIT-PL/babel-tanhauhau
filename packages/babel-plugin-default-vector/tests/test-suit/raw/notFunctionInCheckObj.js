let fn = (x) => {return x};

let obj = {
  "a": 1,
  "b": 2,
  else fn
}

try {
  obj.setCheckfn("hola");
} catch (e) {
  console.log(e.message); // checkfn must be a function
}
let fn = (x) => {return x};

let arr = [1,2,3, else fn];

try {
  arr.setCheckfn(true);
} catch (e) {
  console.log(e.message); // arr.setCheckfn is not a function
}
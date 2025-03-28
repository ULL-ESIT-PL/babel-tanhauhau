let f = (x) => x + 1;
console.time("ElseArray create time");
let elsearr = [1,2,3, else f];
console.timeEnd("ElseArray create time");
console.time("Array create time");
let arr = [1,2,3];
console.timeEnd("Array create time");
console.time("ElseArray push time");
for (let i = 0; i < 1000000; i++) {
  elsearr.push(i);
}
console.timeEnd("ElseArray push time");
console.time("Array push time");
for (let i = 0; i < 1000000; i++) {
  arr.push(i);
}
console.timeEnd("Array push time");
console.time("ElseArray get time");
for (let i = 0; i < 1000000; i++) {
  elsearr[i];
}
console.timeEnd("ElseArray get time");
console.time("Array get time");
for (let i = 0; i < 1000000; i++) {
  arr[i];
}
console.timeEnd("Array get time");
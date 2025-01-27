let a = [1,2,3];
for (let i = 0; i < 10000000; i++) {
  a.push(5);
  a.pop();
}
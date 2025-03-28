let newVec = new DefaultVector([1, 2, 3], (i, vec) => `Index ${i} out of bounds in ${JSON.stringify(vec)}`,{checkInside:false});
console.log(newVec[5]); // "Index 5 out of bounds in [1,2,3]"
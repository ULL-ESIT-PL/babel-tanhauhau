let obj = new DefaultObject({}, undefined, {checkInside: false});
// Eliminar una propiedad que no existe
delete obj.nonExistentProp;
console.log(obj.nonExistentProp); // undefined

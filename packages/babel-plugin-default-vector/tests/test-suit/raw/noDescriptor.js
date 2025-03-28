let obj = new DefaultObject({ key: "value" });
console.log(Object.getOwnPropertyDescriptor(obj, "key")); // descriptor de propiedad con configurable, enumerable, value y writable

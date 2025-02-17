class DefaultVector extends Array {
  constructor(arr, fn = undefined, checkUndefined = true) {
      super(...(Array.isArray(arr) ? arr : []));
      this.checkUndefined = checkUndefined;
      this.fn = fn;
      return new Proxy(this, {
          [Symbol.isConcatSpreadable]: true,
          length: arr.length,
          get: (target, prop, receiver) => {
            if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
            if (typeof target[prop] === "function") {
              return (...args) => {
                let result = target[prop].apply(target, args);
                return Array.isArray(result) ? new DefaultVector(result, this.fn, this.checkUndefined) : result;
              };
            }
            if (typeof target[prop] === "string") return target[prop];
            if (prop in target) return target[prop];
            let index = Number(prop);
            if (!isNaN(index) && index >= 0) {
              if (index >= target.length) {
                if (typeof this.fn === "function") {
                  return this.fn(index);
                }
                return this.fn;
              }
              let value = target[index];
              if (this.checkUndefined && value === undefined) {
                if (typeof this.fn === "function") {
                  return this.fn(index);
                }
                return this.fn;
              }
              return value;
            }
            return this.fn(prop);
        },
        set: (target, prop, value) => {
          target[prop] = value;
          return true;
        }
      });
  }
  setCheckUndefined(checkUndefined) { // TODO: Hacer que puedas cambiar el comprobar si es undefined, comprueba si una función da true con el valor interno tirar el error 
    this.checkUndefined = checkUndefined;
  }
  setElseExpression(fn) {
    this.fn = fn;
  }
}

class DefaultObject {
  constructor(obj = {}, fn = undefined, checkUndefined = true) { 
    this.data = { ...obj };
    this.checkUndefined = checkUndefined;
    this.fn = fn;

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (!(["data", "fn", "checkUndefined"].includes(prop)) && (prop in target)) {
          return target[prop];
        }
        if (prop in target.data) {
          let value = target.data[prop];
          if (typeof value === 'function') {
            return function(...args) {
              let result = value.apply(target, args);
              return (typeof result === 'object' && result !== null)
                ? new DefaultObject(result, target.fn, target.checkUndefined)
                : result;
            };
          }
          if (value === undefined && typeof target.fn === 'function') {
            return target.fn(prop);
          }
          return value;
        }
        if (target.checkUndefined && typeof target.fn === 'function') {
          return target.fn(prop);
        }
        return undefined;
      },
      set(target, prop, value, receiver) {
        if (["data", "fn", "checkUndefined"].includes(prop)) {
          target[prop] = value;
        } else {
          target.data[prop] = value;
        }
        return true;
      },
      defineProperty(target, prop, descriptor) {
        if (["data", "fn", "checkUndefined"].includes(prop)) {
          return Reflect.defineProperty(target, prop, descriptor);
        } else {
          return Reflect.defineProperty(target.data, prop, descriptor);
        }
      },
      getOwnPropertyDescriptor(target, prop) {
        if (!["data", "fn", "checkUndefined"].includes(prop) && (prop in target.data)) {
          let desc = Object.getOwnPropertyDescriptor(target.data, prop);
          if (desc) {
            return {
              configurable: true,
              enumerable: desc.enumerable,
              value: desc.value,
              writable: desc.writable
            };
          }
          return {
            configurable: true,
            enumerable: true,
            value: target.data[prop],
            writable: true
          };
        }
        return Reflect.getOwnPropertyDescriptor(target, prop);
      },
      ownKeys(target) {
        return Reflect.ownKeys(target.data);
      },
      has(target, prop) {
        return (prop in target.data);
      },
      deleteProperty(target, prop) {
        if (prop in target.data) {
          return delete target.data[prop];
        }
        return false;
      }
    });
  }
  
  setCheckUndefined(checkUndefined) {
    this.checkUndefined = checkUndefined;
  }
  
  setElseExpression(fn) {
    this.fn = fn;
  }
}

/*DONE:
Si hago:
let defaultFn = (key) => key + " missing";
let obj = new DefaultObject({
  x: 10,
  y: undefined,
  z: "Zeta"
}, defaultFn, true);
console.log(obj.hasOwnProperty('x'));
Debería devolver true, pero devuelve false, si hago:
console.log(Object.keys(obj).join(',')); 
Debería devolver "x,y,z", pero devuelve "data,checkUndefined,fn"
Pasa algo parecido con el test propertyManipulation.js
*/
module.exports = {
  DefaultVector,
  DefaultObject
};
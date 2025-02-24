class DefaultVector extends Array { // TODO: Comentar posible limitación en el ejemplo inheritanceArray.js
  constructor(arr, fn = undefined, checkInside = true, checkfn = undefined) {
      super(...(Array.isArray(arr) ? arr : []));
      this.checkInside = checkInside;
      this.fn = fn;
      if (checkfn === undefined || typeof checkfn !== 'function') {
        checkfn = function (value) {
          return value === undefined
        }
      }
      this.checkfn = checkfn;
      return new Proxy(this, {
          [Symbol.isConcatSpreadable]: true,
          length: arr.length,
          get: (target, prop, receiver) => {
            if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
            if (typeof target[prop] === "function") {
              return (...args) => {
                let result = target[prop].apply(target, args);
                return Array.isArray(result) ? new DefaultVector(result, this.fn, this.checkInside) : result;
              };
            }
            if (typeof target[prop] === "string") return target[prop];
            let index;
            if (typeof prop === "string" && !isNaN(index = parseInt(prop))) {
              index = Number(prop);
            }
            if (!isNaN(index) && index >= 0) {
              if (index >= target.length) {
                if (typeof this.fn === "function") {
                  return this.fn(index);
                }
                return this.fn;
              }
              let value = target[index];
              if (this.checkInside && target.checkfn(value)) {
                if (typeof this.fn === "function") {
                  return this.fn(index);
                }
                return this.fn;
              }
              return value;
            }
            if (prop in target) return target[prop];
            return this.fn(prop);
        },
        set: (target, prop, value) => {
          target[prop] = value;
          return true;
        }
      });
  }
  setCheckInside(CheckInside) { // TODO: Hacer que puedas cambiar el comprobar si es undefined, comprueba si una función da true con el valor interno
    this.checkInside = CheckInside;
  }
  setElseExpression(fn) {
    this.fn = fn;
  }
  setCheckfn(checkfn) {
    if (typeof checkfn === 'function') {
      this.checkfn = checkfn;
    } else {
      throw new Error('checkfn must be a function');
    }
  }
}

class DefaultObject {
  constructor(obj = {}, fn = undefined, checkInside = true, checkfn= undefined) { 
    this.data = { ...obj };
    this.checkInside = checkInside;
    this.fn = fn;
    if (checkfn === undefined || typeof checkfn !== 'function') {
      checkfn = function (value) {
        return value === undefined
      }
    }
    this.checkfn = checkfn;
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (!(["data", "fn", "checkInside", "checkfn"].includes(prop)) && (prop in target)) {
          return Reflect.get(target, prop, receiver); // Esto es lo que cambié, esto es debido a como maneja js los proxies
        }
        if (prop in target.data) {
          let value = target.data[prop];
          if (target.checkInside && target.checkfn(value) && typeof target.fn === 'function') {
            return target.fn(prop);
          }
          if (typeof value === 'function') {
            return function(...args) {
              let result = value.apply(target, args);
              return (typeof result === 'object' && result !== null)
                ? new DefaultObject(result, target.fn, target.checkInside)
                : result;
            };
          }
          return value;
        }
        if (target.checkInside && typeof target.fn === 'function') {
          return target.fn(prop);
        }
        return undefined;
      },
      set(target, prop, value, receiver) {
        if (["data", "fn", "checkInside", "checkfn"].includes(prop)) {
          Reflect.set(target, prop, value, receiver);
        } else {
          Reflect.set(target.data, prop, value, receiver);
        }
        return true;
      },
      defineProperty(target, prop, descriptor) {
        if (["data", "fn", "checkInside", "checkfn"].includes(prop)) {
          return Reflect.defineProperty(target, prop, descriptor);
        } else {
          return Reflect.defineProperty(target.data, prop, descriptor);
        }
      },
      getOwnPropertyDescriptor(target, prop) {
        if (!["data", "fn", "checkInside", "checkfn"].includes(prop) && (prop in target.data)) {
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
  
  setCheckInside(checkInside) {
    this.checkInside = checkInside;
  }
  
  setElseExpression(fn) {
    this.fn = fn;
  }

  setCheckfn(checkfn) {
    if (typeof checkfn === 'function') {
      this.checkfn = checkfn;
    } else {
      throw new Error('checkfn must be a function');
    }
  }
}


module.exports = {
  DefaultVector,
  DefaultObject
};
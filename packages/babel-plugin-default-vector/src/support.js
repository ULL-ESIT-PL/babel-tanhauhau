class DefaultVector extends Array {
  constructor(arr, fn = undefined, options = {}) {
      super(...(Array.isArray(arr) ? arr : []));
      const {
        checkInside = true,
        checkfn = (value) => value === undefined,
      } = options;
      this.checkInside = checkInside;
      this.fn = fn;
      this.checkfn = checkfn;
      return new Proxy(this, {
          [Symbol.isConcatSpreadable]: true,
          length: arr.length,
          get: (target, prop, receiver) => {
            if (typeof prop === "symbol" && prop === Symbol.isConcatSpreadable) return true;
            if (typeof prop === "symbol") return target[prop]; // Es esto lo que hace que funcione el ejemplo inheritanceArray.js
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
                  return this.fn(index, target);
                }
                return this.fn;
              }
              let value = target[index];
              if (this.checkInside && target.checkfn(value)) {
                if (typeof this.fn === "function") {
                  return this.fn(index, target);
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
  setCheckInside(CheckInside) {
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
  constructor(obj, fn = undefined, options = {}) { 
    const {
      checkInside = true,
      checkfn = (value) => value === undefined,
    } = options;
    this.data = { ...obj };
    this.checkInside = checkInside;
    this.fn = fn;
    this.checkfn = checkfn;
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (!(["data", "fn", "checkInside", "checkfn"].includes(prop)) && (prop in target)) {
          return Reflect.get(target, prop, receiver);
        }
        if (prop in target.data) {
          let value = target.data[prop];
          if (target.checkInside && target.checkfn(value) && typeof target.fn === 'function') {
            return target.fn(prop, target.data);
          }
          if (typeof value === 'function') {
            return function(...args) {
              let result = value.apply(target, args);
              return result;
            };
          }
          return value;
        }
        if (target.checkInside && typeof target.fn === 'function') {
          return target.fn(prop, target.data);
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
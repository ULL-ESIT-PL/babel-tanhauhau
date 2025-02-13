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

module.exports = {
  DefaultVector
};
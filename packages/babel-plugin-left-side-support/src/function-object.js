const debug = false;
const CallableInstance = require("callable-instance");

class StoreMap {
  // Implements the cache based on Map
  constructor() {
    this.store = new Map();
  }
  set(key, value) {
    this.store.set(key, value);
  }
  get(key) {
    return this.store.get(key);
  }
  has(key) {
    return this.store.has(key);
  }
}

class StoreObject {
  // Implements the cache based on Object.create(null)
  constructor() {
    this.store = Object.create(null);
  }
  set(key, value) {
    this.store[key] = value;
  }
  get(key) {
    return this.store[key];
  }
}

class FunctionObject extends CallableInstance {
  constructor(a) {
    // CallableInstance accepts the name of the property to use as the callable
    // method.
    super("_call");
    this.rawFunction = a;
    //this.cache = new StoreObject();
    this.cache = new StoreMap();
    this.function = function (...args) {
      let currentFunctionObject = this;
      for (let i = 0; i < args.length; ++i) {
        const arg = args[i];
        if (currentFunctionObject?.cache && currentFunctionObject.cache.has(arg)) {
          if (debug) console.log(`Cached value! ${currentFunctionObject.cache.get(arg)}`);
          if (i + 1 === args.length) return currentFunctionObject.cache.get(arg); // Value in cache, return it.
          currentFunctionObject = currentFunctionObject.cache.get(arg);
        } else {
          break; // Default to the original rawFunction.
        }
      }
      //console.log(currentFunctionObject)
      return this.rawFunction(...args);
    };
  }

  _call(...args) {
    const result = this.function(...args);
    //console.log(args)
    //console.log(result);
    // Are we sure about this? If the underlying function is supposed to give undefined this would be wrong.
    //return (typeof result == 'undefined') ? null : result;
    return result;
  }

  toFunction() {
    return this.function;
  }

  toString() {
    return this.function.toString();
  }
  setCache(arg, value) {
    //if (arg instanceof Complex) {
    //    arg = arg.toString();
    //}
    this.cache.set(arg, value);
  }
  getCache(arg) {
    //if (arg instanceof Complex) {
    //    arg = arg.toString();
    //}
    return this.cache.get(arg);
  }
}

function functionObject(a) {
  if (a instanceof FunctionObject) return a;
  return new FunctionObject(a);
}

module.exports = { functionObject, FunctionObject };

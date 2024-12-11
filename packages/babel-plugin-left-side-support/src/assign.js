const { functionObject } = require("./function-object");

function assign(f, cacheArgs, cacheValue) {
  //console.log('f', f.toString(), cacheArgs, cacheValue);
  //debugger;
  for (let i = 0; i < cacheArgs.length; i++) {
    const cacheArgument = cacheArgs[i];
    /* It is a possibility to assign both null and undefined argument values.
    if (cacheArgument == null) {
      const error = new Error(
        "Invalid null argument on left side of assignment",
      );
      throw error;
    }*/
    const next = i + 1;
    if (next == cacheArgs.length) {
      // the end
      //console.log(cacheArgs)
      if (!f.cache) {
        // warning f pointer modification
        f = functionObject(f);
      }
      f.setCache(cacheArgument, cacheValue);
      return cacheValue;
    }
    // If there are more arguments
    //console.log(f)
    const auxF = functionObject(f.rawFunction ? f.rawFunction : f);
    //console.log(f(cacheArgument))
    f.setCache(cacheArgument, auxF);
    //console.error(`assign f.cache["${cacheArgument}"] = ${auxF}`);
    f = auxF;
  }
}

module.exports = { assign };

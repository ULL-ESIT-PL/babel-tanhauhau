const { parse } = require("../babel-parser/lib/index.js")

module.exports = {
  "plugins":
   [
    /*{
      parserOverride(code, opts) {
        return parse(code.opts);
      }
    },*/
    "../babel-plugin-left-side-plugin/lib/plugin.js"
  ]
}
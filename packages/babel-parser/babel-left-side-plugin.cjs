const parser = require("./lib/index.js");

module.exports = function leftSidePlugin(babel) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      AssignmentExpression(path) {
        const node = path.node
        if (node.operator == "=" && node.left.type == "CallExpression") {
          // This supposes that the callee is an ID and not a member expression nor another function.
          const callee = node.left.callee;
          const args = node.left.arguments;
          const rvalue = node.right;
          const assignArgs = [callee, ...args, rvalue];
          const functionAssign = babel.types.identifier("assign");
          path.replaceWith(babel.types.callExpression(functionAssign, assignArgs));
        }
      }
      // TODO: Change FunctionDeclaration to the form of const foo = functionObject(function() {}) 
   }
  }
}
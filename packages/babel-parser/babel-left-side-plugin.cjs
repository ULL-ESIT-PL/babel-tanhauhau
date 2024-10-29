const parser = require("./lib/index.js");
const types = require('@babel/types');

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
      },
      FunctionDeclaration(path) {
        const node = path.node;
        if (node.assignable) {
          node.assignable = false;
          const identifier = types.identifier("functionObject");
          const funId = node.id;
          node.id = null;
          // Replace the FunctionDeclaration with FunctionExpression.
          const funAsExpr = types.functionExpression(null, node.params, node.body);
          const callExpression = types.callExpression(identifier, [funAsExpr]);
          const varDeclarator = types.variableDeclarator(funId, callExpression);
          path.replaceWith(types.variableDeclaration("const", [varDeclarator]));
        }
      }      
   }
  }
}
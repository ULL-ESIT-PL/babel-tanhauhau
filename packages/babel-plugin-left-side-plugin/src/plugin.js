const parser = require("@ull-esit-pl/parser-left-side");
const types = require("@babel/types");
import template from "@babel/template";
// TODO: Switch to the scoped name when publishing the package.
const SUPPORT_TEMPLATE = template(
  'const {assign, functionObject} = require("@ull-esit-pl/babel-plugin-left-side-support");',
)();

module.exports = function leftSidePlugin(babel) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      AssignmentExpression(path) {
        const node = path.node;
        if (node.operator == "=" && node.left.type == "CallExpression") {
          // This supposes that the callee is an ID and not a member expression nor another function.
          const callee = node.left.callee;
          const args = node.left.arguments;
          const rvalue = node.right;
          const argsArray = types.arrayExpression(args);
          const assignArgs = [callee, argsArray, rvalue];
          const functionAssign = babel.types.identifier("assign");
          path.replaceWith(
            babel.types.callExpression(functionAssign, assignArgs),
          );
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
          const funAsExpr = types.functionExpression(
            null,
            node.params,
            node.body,
          );
          const callExpression = types.callExpression(identifier, [funAsExpr]);
          const varDeclarator = types.variableDeclarator(funId, callExpression);
          path.replaceWith(types.variableDeclaration("const", [varDeclarator]));
        }
      },
      Program(path) {
        const node = path.node;
        // Perhaps checking when it's actually needed? Write on exit if an assignable function was created.
        node.body.unshift(SUPPORT_TEMPLATE);
      },
    },
  };
};

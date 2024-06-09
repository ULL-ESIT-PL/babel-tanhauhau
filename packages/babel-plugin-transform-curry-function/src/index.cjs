//import { declare } from "@babel/helper-plugin-utils";
const { declare } = require("@babel/helper-plugin-utils");
//import { types as t } from "@babel/core";
const { types: t } = require("@babel/core");

//export default 
module.exports = declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-literals",

    /* Tan's code
    visitor: {
      FunctionDeclaration(path) {
        if (path.get("curry").node) {
          // const foo = curry(function () { ... });
          const functionName = path.get("id.name").node;
          path.node.id = undefined;
          path.node.curry = false;

          path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(functionName),
                t.callExpression(this.addHelper("currying"), [
                  t.toExpression(path.node),
                ]),
              ),
            ]),
          );

          // hoist it
          const node = path.node;
          const currentScope = path.scope.path;
          path.remove();
          currentScope.unshiftContainer("body", node);
        }
      },
    },
    */
    visitor: {
      FunctionDeclaration(path) {
        if (path.get("curry").node) { 
          const functionName = path.get("id.name").node;
          path.node.id = undefined;
          path.node.curry = false; // avoid infinite loop

          path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(functionName),
                // t.callExpression(this.addHelper("currying"), [
                t.callExpression(t.identifier("currying"), [ 
                  t.toExpression(path.node),
                ]),
              ), 
            ]),
          );

          // hoist it
          const node = path.node;
          const currentScope = path.scope.path.node;
          path.remove();
          if (currentScope.body.body) {
            currentScope.body.body.unshift(node);
          } else {
            currentScope.body.unshift(node);
          }
        }
      },
    },
  };
});

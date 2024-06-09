// Tan's code
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-literals",

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
  };
});

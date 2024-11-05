const parser = require("./lib/index.js");
const types = require('@babel/types');

module.exports = function defaultVector({ types: t }) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      ArrayExpression(path) {
        const elements = path.node.elements;
        const lastElement = elements[elements.length - 1];

        // Check if the last element is an `ElseExpression`
        if (lastElement && lastElement.type === 'ElseExpression') {
          const elseExpression = lastElement.expression;
          elements.pop(); // Remove the `else` element

          // Define the proxy replacement
          const proxyExpression = t.newExpression(
            t.identifier("Proxy"),
            [
              t.arrayExpression(elements),
              t.objectExpression([
                t.objectProperty(
                  t.identifier("get"),
                  t.functionExpression(
                    null,
                    [t.identifier("target"), t.identifier("prop")],
                    t.blockStatement([
                      // Check if the `prop` is within array range
                      t.ifStatement(
                        t.binaryExpression(
                          "<",
                          t.identifier("prop"),
                          t.memberExpression(t.identifier("target"), t.identifier("length"))
                        ),
                        t.returnStatement(
                          t.memberExpression(t.identifier("target"), t.identifier("prop"), true)
                        )
                      ),
                      // Use `ConditionalExpression` only if `elseExpression` is a function
                      t.returnStatement(
                        t.isFunctionExpression(elseExpression) || t.isArrowFunctionExpression(elseExpression)
                          ? t.callExpression(elseExpression, [t.identifier("prop")])
                          : elseExpression
                      )
                    ])
                  )
                )
              ])
            ]
          );

          path.replaceWith(proxyExpression);
        }
      }
    }
  };
};

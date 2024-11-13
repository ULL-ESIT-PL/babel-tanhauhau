const parser = require("./lib/index.js");
const types = require('@babel/types');
// Right now if you use the default vector, you can´t use it as a parameter in a function that requires a vector
// Posible solution:
// Have a list of all the vectors that are created with the default vector and then when a function is called with a vector as a parameter
// check if the vector is in the list and if it is, replace it with vector.slice() (Space: O(n), Time: O(n))
// or with [...vector] (Space: O(n), Time: O(n))
module.exports = function defaultVector({ types: t }) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      ArrayExpression(path) {
        const elements = path.node.elements;
        const lastElement = elements[elements.length - 1];

 
        if (lastElement && lastElement.type === 'ElseExpression') {
          const elseExpression = lastElement.expression;
          elements.pop();

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
                      t.ifStatement(
                        t.binaryExpression(
                          "===",
                          t.unaryExpression("typeof", t.memberExpression(t.identifier("target"), t.identifier("prop"),true)),
                          t.stringLiteral("function")
                        ),
                        t.returnStatement(
                          t.functionExpression(
                            null,
                            [t.restElement(t.identifier("args"))],
                            t.blockStatement([
                              t.returnStatement(
                                t.callExpression(
                                  t.memberExpression(
                                    t.memberExpression(t.identifier("target"), t.identifier("prop"), true),
                                    t.identifier("apply")
                                  ),
                                  [t.identifier("target"), t.identifier("args")] 
                                )
                              )
                            ])
                          )
                        )
                      ),

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
                      t.returnStatement(
                        t.isFunctionExpression(elseExpression) || t.isArrowFunctionExpression(elseExpression) ? 
                        t.callExpression(elseExpression, [t.identifier("prop")]) : elseExpression
                      )
                    ])
                  )
                ),
              ])
            ]
          );

          path.replaceWith(proxyExpression);
        }
      }
    }
  };
};

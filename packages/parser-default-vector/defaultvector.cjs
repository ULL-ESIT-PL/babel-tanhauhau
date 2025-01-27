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
        if (lastElement && lastElement.type === 'ElseExpression') {
          const elseExpression = lastElement.expression;
          elements.pop();
          const proxyExpression = t.newExpression(
            t.identifier("Proxy"),
            [
              t.arrayExpression(elements),
              t.objectExpression([
                t.objectProperty(
                  t.identifier("[Symbol.isConcatSpreadable]"),
                  t.booleanLiteral(true)
                ),
                t.objectProperty(
                  t.identifier("length"),
                  t.numericLiteral(elements.length)
                ),
                t.objectProperty(
                  t.identifier("get"),
                  t.functionExpression(
                    null,
                    [t.identifier("target"), t.identifier("prop")],
                    t.blockStatement([
                      t.ifStatement(
                        t.logicalExpression(
                          "&&",
                          t.binaryExpression(
                            "===",
                            t.unaryExpression("typeof", t.identifier("prop")),
                            t.stringLiteral("symbol")
                          ),
                          t.binaryExpression(
                            "===",
                            t.identifier("prop"),
                            t.memberExpression(t.identifier("Symbol"), t.identifier("isConcatSpreadable"))
                          )
                        ),
                        t.returnStatement(t.booleanLiteral(true))
                      ),
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
                          "===",
                          t.unaryExpression(
                            "typeof",
                            t.memberExpression( // Si cambio esto por lo dicho en la discusión 17: a.concat(b) funciona el concat pero no el else
                              t.identifier("target"),
                               t.identifier("prop"),
                               true
                            )
                          ),
                          t.stringLiteral("string")
                        ),
                        t.returnStatement(
                          t.memberExpression(t.identifier("target"), 
                            t.identifier("prop"), 
                            true
                          )
                        )
                      ),
                      t.ifStatement(
                        t.logicalExpression(
                          "&&",
                          t.callExpression(
                            t.identifier("isNumeric"),
                            [t.identifier("prop")]
                          ),
                          t.logicalExpression( // Esta expresión es temporal hasta decidir qué hacer con los índices negativos
                            "&&",
                            t.binaryExpression(
                              "<",
                              t.identifier("prop"),
                              t.memberExpression(t.identifier("target"), t.identifier("length"))
                            ),
                            t.binaryExpression(
                              ">=",
                              t.identifier("prop"),
                              t.numericLiteral(0)
                            )
                          )
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
      },
      // Añadir la función isNumeric al principio del archivo
      Program(path) {
        path.node.body.unshift(
          t.functionDeclaration(
            t.identifier("isNumeric"),
            [t.identifier("n")],
            t.blockStatement([
              t.returnStatement(
                t.logicalExpression(
                  "&&",
                  t.unaryExpression(
                    "!",
                    t.callExpression(
                      t.identifier("isNaN"),
                      [t.identifier("n")]
                    )
                  ),
                  t.callExpression(
                    t.identifier("isFinite"),
                    [t.identifier("n")]
                  )
                ),
              )
            ])
          )
        );
      }
    }
  };
};

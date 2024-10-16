let defaultVector = function ({ types: t }) {
  return {
    visitor: {
      ArrayExpression(path) {
        const elements = path.node.elements;
        const lastElement = elements[elements.length - 1];

        if (t.isConditionalExpression(lastElement) && lastElement.alternate) {
          const elseExpression = lastElement.alternate;

          // Eliminar el último elemento `else`
          elements.pop();

          // Reemplaza el arreglo por un Proxy que maneja los accesos fuera de rango
          path.replaceWith(
            t.newExpression(
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
                            "<",
                            t.identifier("prop"),
                            t.memberExpression(t.identifier("target"), t.identifier("length"))
                          ),
                          t.returnStatement(
                            t.memberExpression(t.identifier("target"), t.identifier("prop"), true)
                          )
                        ),
                        t.returnStatement(
                          t.conditionalExpression(
                            t.isFunctionExpression(elseExpression)
                              ? t.callExpression(elseExpression, [t.identifier("prop")])
                              : elseExpression
                          )
                        )
                      ])
                    )
                  )
                ])
              ]
            )
          );
        }
      }
    }
  };
};

export default defaultVector;
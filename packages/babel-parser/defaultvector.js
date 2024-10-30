let defaultVector = function ({ types: t }) {
  return {
    visitor: {
      ArrayExpression(path) {
        const elements = path.node.elements;
        const lastElement = elements[elements.length - 1];

        // Verifica si el último elemento es una expresión de "else" (por ejemplo, una función o valor)
        if (t.isArrowFunctionExpression(lastElement) || t.isFunctionExpression(lastElement)) {
          const elseExpression = lastElement;

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
                        // Verifica si la propiedad solicitada está dentro del rango del array
                        t.ifStatement(
                          t.binaryExpression(
                            "<",
                            t.identifier("prop"),
                            t.memberExpression(t.identifier("target"), t.identifier("length"))
                          ),
                          // Retorna el elemento si está dentro del rango
                          t.returnStatement(
                            t.memberExpression(t.identifier("target"), t.identifier("prop"), true)
                          )
                        ),
                        // Si está fuera del rango, ejecuta la expresión o función de "else"
                        t.returnStatement(
                          t.conditionalExpression(
                            t.isFunctionExpression(elseExpression) || t.isArrowFunctionExpression(elseExpression),
                            t.callExpression(elseExpression, [t.identifier("prop")]),
                            elseExpression
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

const parser = require("../../parser-default-vector/lib/index.js");
const types = require('@babel/types');
const path = require('path');
let hasElseExpression = false;
let alreadyImported = false;
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
          hasElseExpression = true;
          const elseExpression = lastElement.expression;
          elements.pop();
          const classInstance = t.newExpression(
            t.identifier("DefaultVector"),
            [
              t.arrayExpression(elements),
              elseExpression
            ]
          );
          path.replaceWith(classInstance);
        }
        if (hasElseExpression) {
          if (!alreadyImported) {
            path.findParent(p => p.isProgram()).unshiftContainer("body",
              t.variableDeclaration("const", [
                t.variableDeclarator(
                  t.objectPattern([
                    t.objectProperty(t.identifier("DefaultVector"), t.identifier("DefaultVector")),
                  ]),
                  t.callExpression(t.identifier("require"), [
                    t.stringLiteral(__dirname +'/support.js')
                  ])
                )
              ])
            );
            alreadyImported = true;
          }
        }
      },
      Identifier(path) {
        if (path.node.name === 'DefaultVector' && !alreadyImported) {
          path.findParent(p => p.isProgram()).unshiftContainer("body",
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern([
                  t.objectProperty(t.identifier("DefaultVector"), t.identifier("DefaultVector")),
                ]),
                t.callExpression(t.identifier("require"), [
                  t.stringLiteral(__dirname +'/support.js')
                ])
              )
            ])
          );
          alreadyImported = true;
        }
      },
      Program: { // TODO: Decir en la reunión por qué tuve que añadir esto
        exit(path) {
          alreadyImported = false;
        }
      }
    }
  };
};

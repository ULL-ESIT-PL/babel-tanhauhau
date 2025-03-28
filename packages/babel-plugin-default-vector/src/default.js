const parser = require("../../parser-default-vector/lib/index.js");
const types = require('@babel/types');
const path = require('path');
let hasElseExpression = false;
let hasElseExpressionObject = false;
let alreadyImportedVector = false;
let alreadyImportedObject = false;

module.exports = function defaultVector({ types: t }) {
  return {
    parserOverride(code, opts) {
      return parser.parse(code, opts);
    },
    visitor: {
      ObjectExpression(path) {
        if (path.node.elseExpression) {
          hasElseExpressionObject = true;
          const elseExpression = path.node.elseExpression;
          const properties = path.node.properties;
          const classInstance = t.newExpression(
            t.identifier("DefaultObject"),
            [
              t.objectExpression(properties),
              elseExpression
            ]
          );
          
          path.replaceWith(classInstance);
        }
        
        if (hasElseExpressionObject && !alreadyImportedObject) {
          path.findParent(p => p.isProgram()).unshiftContainer("body",
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern([
                  t.objectProperty(t.identifier("DefaultObject"), t.identifier("DefaultObject")),
                ]),
                t.callExpression(t.identifier("require"), [
                  t.stringLiteral(__dirname + '/support.js')
                ])
              )
            ])
          );
          alreadyImportedObject = true;
        }
      },
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
        
        if (hasElseExpression && !alreadyImportedVector) {
          path.findParent(p => p.isProgram()).unshiftContainer("body",
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern([
                  t.objectProperty(t.identifier("DefaultVector"), t.identifier("DefaultVector")),
                ]),
                t.callExpression(t.identifier("require"), [
                  t.stringLiteral(__dirname + '/support.js')
                ])
              )
            ])
          );
          alreadyImportedVector = true;
        }
      },
      Identifier(path) {
        if ((path.node.name === 'DefaultVector' && !alreadyImportedVector)) {
          path.findParent(p => p.isProgram()).unshiftContainer("body",
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern([
                  t.objectProperty(t.identifier("DefaultVector"), t.identifier("DefaultVector")),
                ]),
                t.callExpression(t.identifier("require"), [
                  t.stringLiteral(__dirname + '/support.js')
                ])
              )
            ])
          );
          alreadyImportedVector = true;
        }
        if ((path.node.name === 'DefaultObject' && !alreadyImportedObject)) {
          path.findParent(p => p.isProgram()).unshiftContainer("body",
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.objectPattern([
                  t.objectProperty(t.identifier("DefaultObject"), t.identifier("DefaultObject")),
                ]),
                t.callExpression(t.identifier("require"), [
                  t.stringLiteral(__dirname + '/support.js')
                ])
              )
            ])
          );
          alreadyImportedObject = true;
        }
      },
      Program: {
        exit(path) {
          alreadyImportedVector = false;
          alreadyImportedObject = false;
          hasElseExpression = false;
          hasElseExpressionObject = false;
        }
      }
    }
  };
};

const { parse } =  require('../lib');

function getParser(code) {
  return () => parse(code, { sourceType: 'module' });
}
let input = `function @@ foo() {}`;
let ast = getParser(input)();

console.log(JSON.stringify(ast, null, "  "));
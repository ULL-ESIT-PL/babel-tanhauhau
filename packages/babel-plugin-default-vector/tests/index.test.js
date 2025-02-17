const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const myPlugin = require('../src/default.js');  // Cambiar esto si el plugin está en otra ruta
const { execSync } = require('child_process');
require("../src/support.js");

oldLog = console.log;
console.log = function (message) {message}
describe('Babel Plugin Tests', () => {
  //Si estás en la raiz del plugin, usar tests/test-suit en lugar de test-suit'
  let testNames = "";
  let basePath = "";
  if (fs.existsSync('tests/test-suit/test-names.txt')) {
    testNames = fs.readFileSync('tests/test-suit/test-names.txt', 'utf-8').split('\n').filter(Boolean);
    basePath = 'tests/test-suit';
  } else {
    testNames = fs.readFileSync('test-suit/test-names.txt', 'utf-8').split('\n').filter(Boolean);
    basePath = 'test-suit';
  }
  testNames.forEach((testName) => {
    it(`should transpile and execute ${testName} correctly`, () => {
      const rawFilePath = path.join(basePath +'/raw', `${testName}.js`);
      if (!fs.existsSync(rawFilePath)) {
        throw new Error(`El archivo ${rawFilePath} no existe.`);
      }
      const code = fs.readFileSync(rawFilePath, 'utf-8');
      const { code: transpiledCode } = babel.transform(code, {
        plugins: [myPlugin],
      });
      const transpiledFilePath = path.join(basePath +'/transpiled', `${testName}.js`);
      fs.writeFileSync(transpiledFilePath, transpiledCode);
      const resultFilePath = path.join(basePath +'/results', `${testName}.txt`);
      eval(transpiledCode);
      const output = execSync(`node ${transpiledFilePath}`).toString();
      fs.writeFileSync(resultFilePath, output);
      const expectedFilePath = path.join(basePath +'/expected', `${testName}.txt`);
      if (!fs.existsSync(expectedFilePath)) {
        throw new Error(`El archivo esperado ${expectedFilePath} no existe.`);
      }
      const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
      expect(output).toBe(expectedOutput);
    });
  });
});

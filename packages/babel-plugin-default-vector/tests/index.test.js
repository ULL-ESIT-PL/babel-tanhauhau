const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const myPlugin = require('../src/defaultvector.js');  // Cambiar esto si el plugin está en otra ruta
const { execSync } = require('child_process');

describe('Babel Plugin Tests', () => {
  const testNames = fs.readFileSync('test-suit/test-names.txt', 'utf-8').split('\n').filter(Boolean);
  testNames.forEach((testName) => {
    it(`should transpile and execute ${testName} correctly`, () => {
      const rawFilePath = path.join('test-suit/raw', `${testName}.js`);
      if (!fs.existsSync(rawFilePath)) {
        throw new Error(`El archivo ${rawFilePath} no existe.`);
      }
      const code = fs.readFileSync(rawFilePath, 'utf-8');
      const { code: transpiledCode } = babel.transform(code, {
        plugins: [myPlugin],
      });
      const transpiledFilePath = path.join('test-suit/transpiled', `${testName}.js`);
      fs.writeFileSync(transpiledFilePath, transpiledCode);
      const resultFilePath = path.join('test-suit/results', `${testName}.txt`);
      const output = execSync(`node ${transpiledFilePath}`, { encoding: 'utf-8' });
      fs.writeFileSync(resultFilePath, output);
      const expectedFilePath = path.join('test-suit/expected', `${testName}.txt`);
      if (!fs.existsSync(expectedFilePath)) {
        throw new Error(`El archivo esperado ${expectedFilePath} no existe.`);
      }
      const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
      expect(output).toBe(expectedOutput);
    });
  });
});

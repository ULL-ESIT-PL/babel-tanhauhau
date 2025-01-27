const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const myPlugin = require('../src/defaultvector.js');  // Cambia esto si el plugin está en otra ruta
const { execSync } = require('child_process');

describe('Babel Plugin Tests', () => {
  // Leer los nombres de los tests desde el archivo test.js o similar
  const testNames = fs.readFileSync('test-suit/test-names.txt', 'utf-8').split('\n').filter(Boolean);

  testNames.forEach((testName) => {
    it(`should transpile and execute ${testName} correctly`, () => {
      // Ruta del archivo en la carpeta `raw`
      const rawFilePath = path.join('test-suit/raw', `${testName}.js`);

      // Verificar que el archivo existe
      if (!fs.existsSync(rawFilePath)) {
        throw new Error(`El archivo ${rawFilePath} no existe.`);
      }

      // Leer el código fuente
      const code = fs.readFileSync(rawFilePath, 'utf-8');

      // Transpilar el código con el plugin de Babel
      const { code: transpiledCode } = babel.transform(code, {
        plugins: [myPlugin],
      });

      // Guardar el código transpilado en la carpeta `transpiled`
      const transpiledFilePath = path.join('test-suit/transpiled', `${testName}.js`);
      fs.writeFileSync(transpiledFilePath, transpiledCode);

      // Ejecutar el código transpilado con Node.js y guardar la salida en `results`
      const resultFilePath = path.join('test-suit/results', `${testName}.txt`);
      const output = execSync(`node ${transpiledFilePath}`, { encoding: 'utf-8' });
      fs.writeFileSync(resultFilePath, output);

      // Comparar la salida con el archivo esperado
      const expectedFilePath = path.join('test-suit/expected', `${testName}.txt`);
      if (!fs.existsSync(expectedFilePath)) {
        throw new Error(`El archivo esperado ${expectedFilePath} no existe.`);
      }

      const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8');
      expect(output).toBe(expectedOutput);
    });
  });
});

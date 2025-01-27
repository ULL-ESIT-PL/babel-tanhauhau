const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Función principal que automatiza el proceso
function processTest(testName) {
  const rawPath = path.join(__dirname, 'test-suit', 'raw', `${testName}.js`);
  const expectedPath = path.join(__dirname, 'test-suit', 'expected', `${testName}.txt`);
  const transpiledPath = path.join(__dirname, 'test-suit', 'transpiled', `${testName}.js`);
  const testNamesPath = path.join(__dirname, 'test-suit', 'test-names.txt');

  // Verificar si el archivo .js en 'raw' existe
  if (!fs.existsSync(rawPath)) {
    console.error(`El archivo ${testName}.js no existe en la carpeta 'raw'.`);
    return;
  }

  // Ejecutar Babel para transpilar el código
  exec(`npx babel ${rawPath} --out-file ${transpiledPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al transpilar: ${stderr}`);
      return;
    }

    console.log(`Transpilación exitosa de ${testName}.js.`);

    // Ejecutar el archivo transpilado con Node
    exec(`node ${transpiledPath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error al ejecutar el archivo transpilado: ${stderr}`);
        return;
      }

      // Guardar la salida en el archivo esperado
      fs.writeFileSync(expectedPath, stdout, 'utf-8');
      console.log(`Resultado guardado en ${expectedPath}`);

      // Comprobar si el testName ya está en test-names.txt antes de añadirlo
      fs.readFile(testNamesPath, 'utf-8', (err, data) => {
        if (err) {
          console.error(`Error al leer test-names.txt: ${err}`);
          return;
        }

        // Si el nombre no existe, añadirlo
        if (!data.includes(testName)) {
          fs.appendFileSync(testNamesPath, `${testName}\n`, 'utf-8');
          console.log(`Nombre ${testName} añadido a test-names.txt.`);
        } else {
          console.log(`El nombre ${testName} ya está en test-names.txt.`);
        }
      });
    });
  });
}

// Ejecutar el proceso pasando el nombre del test desde los argumentos de la línea de comando
const testName = process.argv[2];

if (!testName) {
  console.error("Por favor, pasa el nombre del test como argumento.");
  process.exit(1);
}

processTest(testName);

// index.js
const fs = require('fs').promises;
const path = require('path');
const algoliasearch = require('algoliasearch');

// Configuración de Algolia
const ALGOLIA_APP_ID = 'YEIZQWKHWT';
const ALGOLIA_API_KEY = 'e6315654821d54fda5e543cd1d243983';
const ALGOLIA_INDEX_NAME = 'title';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Directorio que contiene tus archivos .md
const contentDir = './docs/pills';

const checkDirectories = async () => {
  const records = []
  try {
    const directories = await fs.readdir(contentDir);

    for (const dir of directories) {
      const currentDir = path.join(contentDir, dir);
      const files = await fs.readdir(currentDir);

      for (const file of files) {
        try {
          const filePath = path.join(currentDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          records.push({
            objectID: filePath,
            content: content,
          });
        } catch (readError) {
          console.error(`Error reading file ${file} in directory ${dir}:`, readError);
        }
      }
    }

    console.log({records})

  
  } catch (error) {
    console.error('Error accessing directories:', error);
  }
};

const indexFiles = async (directory) => {
  const currentDir = `${contentDir}/${directory}`
  // console.log('DIRECTORY', directory)
  const files = await fs.readdirSync(currentDir);
  // console.log('FILES', files) 
  
  const records = await files.map(async (file) => {
    const content = await fs.readFileSync(path.join(currentDir, file), 'utf-8');
    return {
      objectID: file,
      content,
    };
  });

  console.log('records 1', records)
  return await records

  // try {
  //   // Envia los registros a Algolia
  //   console.log(records)
  //   await index.saveObjects(records);
  //   console.log('Indexación completada.', `${files}` in `${contentDir}/${directory}`);
  // } catch (error) {
  //   console.error('Error al indexar:', error);
  // }
}

// // Función para leer y enviar archivos a Algolia
// const indexFiles = async () => {


//   console.log(directories)

  // const files = fs.readdirSync(contentDir);
  // console.log('----------------')
  // console.log(files)
  // console.log('----------------')

  // const records = files.map((file) => {
  //   const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  //   return {
  //     objectID: file,
  //     content,
  //   };
  // });

  // try {
  //   // Envia los registros a Algolia
  //   await index.saveObjects(records);
  //   console.log('Indexación completada.');
  // } catch (error) {
  //   console.error('Error al indexar:', error);
  // }
// };

// Ejecuta la función de indexación
// indexFiles();

checkDirectories();

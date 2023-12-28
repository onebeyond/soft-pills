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

const getRecordsFromDirectories = async () => {
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

    return records
  } catch (error) {
    console.error('Error accessing directories:', error);
  }
};


// // Función para leer y enviar archivos a Algolia
const indexFiles = async () => {

  try {
    const recordsToIndex = await getRecordsFromDirectories()
    // Envia los registros a Algolia
    const result = await index.saveObjects(recordsToIndex);
    console.log('Indexación completada.', result);
  } catch (error) {
    console.error('Error al indexar:', error);
  }
};

// Ejecuta la función de indexación
indexFiles();


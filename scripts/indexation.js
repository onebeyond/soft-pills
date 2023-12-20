// index.js
const fs = require('fs');
const path = require('path');
const algoliasearch = require('algoliasearch');

// Configuración de Algolia
const ALGOLIA_APP_ID = 'YEIZQWKHWT';
const ALGOLIA_API_KEY = 'e6315654821d54fda5e543cd1d243983';
const ALGOLIA_INDEX_NAME = 'title';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Directorio que contiene tus archivos .md
const contentDir = './docs/pills'

const checkDirectories = async () => {
  // const records = [];
  const directories = await fs.readdirSync(contentDir);
  const records = await directories.map(async (dir) => {
    const currentDir = `${contentDir}/${dir}`;
    const files = await fs.readdirSync(currentDir);

    const foo = files.map(async (file) => {
      const content = await fs.readFileSync(path.join(currentDir, file), 'utf-8');
      console.log('file', file)
      return{
        objectID: file,
        content,
      };
    })
    return foo
  })

  // const records = await directories.map(async (directory) => {
  //   const currentDir = `${contentDir}/${directory}`
  //   const files = await fs.readdirSync(currentDir);
  //   const output = await files.map(async (file) => {
  //     const content = await fs.readFileSync(path.join(currentDir, file), 'utf-8');
  //     return {
  //       objectID: file,
  //       content,
  //     };
  //   });
  //   console.log('output 2', output)
  //   return output
  // })
  // const records = await directories.forEach(async (directory) => {
  //   await indexFiles(directory)
  // })
  Promise.all(records).then((values) => {
    console.log('records', records)
    console.log('values', values)
  })  

}

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
checkDirectories()

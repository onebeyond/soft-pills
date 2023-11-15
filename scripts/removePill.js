/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { list } = require("postcss");

const readdir = promisify(require("fs").readdir);
const stat = promisify(require("fs").stat);

const getPathContent = async () => {
  const pathContent = [];
  const newPath = path.join(__dirname, "../docs/pills");
  let files = await readdir(newPath);
  let pathName = newPath;
  const absPath = path.resolve(pathName);

  for (let file of files) {
    try {
      let stats = await stat(absPath + "/" + file);
      if (stats.isFile()) {
        pathContent.push(file.substring(0, file.lastIndexOf(".")));
      } else if (stats.isDirectory()) {
        pathContent.push(file);
      }
    } catch (err) {
      throw new Error(
        `❌ Something bad happened while getting the list of Pills: ${err}`
      );
    }
  }

  return pathContent;
};

const removePill = (title) => {
  const path = `./docs/pills/${title}`;
  if (!fs.existsSync(path)) {
    throw new Error(`❌ The ${title} pill doesn't exist`);
  }
  fs.rm(path, { recursive: true }, (err) => {
    console.log(`Start removing pill ${title}`);
    if (err) {
      throw err;
    }
    console.log("-----------------");
    console.log(`Pill ${title} removed correctly`);
  });
};

const start = async () => {
  const STEPS = [
    {
      type: "list",
      name: "title",
      message: "Which file would you like to delete?",
      choices: await getPathContent(),
    },
    {
      message: "Are you sure?",
      name: "confirmation",
      type: "confirm",
    },
  ];

  inquirer
    .prompt(STEPS)
    .then((answers) => {
      if (!answers.confirmation) {
        console.log("Remove process cancelled");
        return;
      }
      removePill(answers.title);
    })
    .catch((error) => {
      if (error.isTtyError) {
        throw new Error(
          "Prompt couldn't be rendered in the current environment"
        );
      }
      if (error) {
        throw error;
      } else {
        throw new Error("Something else went wrong");
      }
    });
};

start();

/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
const fs = require('fs');

const STEPS = [
  { message: "What's pill name which you want to remove?", name: 'title', default: 'remove-pill' },
  {
    message: 'Are you sure?', name: 'confirmation', type: 'confirm',
  },
];

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
    console.log('-----------------');
    console.log(`Pill ${title} removed correctly`);
  });
};

const start = () => {
  inquirer
    .prompt(STEPS)
    .then((answers) => {
      if (!answers.confirmation) {
        console.log('Remove process cancelled');
        return;
      }
      removePill(answers.title);
    })
    .catch((error) => {
      if (error.isTtyError) {
        throw new Error("Prompt couldn't be rendered in the current environment");
      } if (error) {
        throw error;
      } else {
        throw new Error('Something else went wrong');
      }
    });
};

start();

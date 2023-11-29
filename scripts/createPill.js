/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
const fs = require('fs');
const { spawn } = require('child_process')

const STEPS = [
  { message: "What's your pill name?", name: 'title', default: 'new-pill' },
  { message: 'Who is the author?', name: 'author', default: 'unknown' },
  { message: 'Add some keywords (split by ",")', name: 'keywords', default: [] },
];

const formatArrayContent = (str) => {
  console.log('str', str)
  if(!str.length) return [];
  return str?.split(',')
  .filter((k) => k.trim())
  .map((k) => `"${k.trim()}"`)
}

const kebabCase = (string) => string
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map((x) => x.toLowerCase())
  .join('-');

const formatDate = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
};

const createPill = async ({ title, author, keywords }) => {
  await spawn(`git checkout -b feat/${title}`, {
    stdio: 'pipe',
    shell: true
  })
  const dir = `./docs/pills/${kebabCase(title)}`;
  if (fs.existsSync(dir)) {
    throw new Error(`❌ The ${title} pill already exist`);
  }
  const content = `---
  slug: "/${kebabCase(title)}"
  date: "${formatDate()}"
  author: "${author}"
  title:  "${title}"
  description: "ADD A PILL DESCRIPTION HERE"
  keywords: [${formatArrayContent(keywords)}]
---
# ${title}
  ### 1. Context
  Lorem ipsum

  ### 2. Actions
  Lorem ipsum 

  ### 3. Result
  <details>
  <summary>see result</summary>
  Lorem ipsum 
  </details>
`;
  const fileName = `${dir}/${kebabCase(title)}.md`;

  await fs.mkdirSync(dir);
  await fs.writeFileSync(fileName, content, 'utf8');
  console.log(`----------------------------------`);
  console.log(`🪄  We move to the branch feat/${title}`);
  console.log(`----------------------------------`);
  console.log(`😊 Your pill has been created with success at ${dir}`);
  console.log(`----------------------------------`);
  console.log('🏁  Once content is created, you can do a Pull Request to merge your branch with main');
  console.log(`----------------------------------`);
};

const start = () => {
  inquirer
    .prompt(STEPS)
    .then((answers) => {
      createPill(answers);
    })
    .catch((error) => {
      if (error.isTtyError) {
        throw new Error("Prompt couldn't be rendered in the current environment");
      }
      if (error) {
        throw error;
      } else {
        throw new Error('Something else went wrong');
      }
    });
};

start();

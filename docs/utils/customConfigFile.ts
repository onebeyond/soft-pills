const fs = require('fs');

interface ISideBarItem {
  text: string;
  link: string;
}

export const getSideBarItems = (): ISideBarItem[] => {
  let output: ISideBarItem[] = [];
  fs.readdirSync('./docs/pills').forEach((file: string) => {
    output.push({
      text: file,
      link: `/pills/${file}/${file}`,
    });
  });
  return output;
}

export const getMainPillsLink = (): string => {
  let link = '';
  fs.readdirSync('./docs/pills').forEach((file: string, index: number) => {
    if(index !== 0) {
      return
    }
    link = `/pills/${file}/${file}`
  });
  return link;
}

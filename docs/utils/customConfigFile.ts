const fs = require("fs");

interface ISideBarItem {
  text: string;
  link: string;
}

export const getSideBarItems = (): ISideBarItem[] => {
  let output: ISideBarItem[] = [];
  fs.readdirSync("./docs/pills").forEach((file: string) => {
    const textName = file
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    output.push({
      text: textName,
      link: `/pills/${file}/${file}`,
    });
  });

  console.log({ output });
  return output;
};

export const getMainPillsLink = (): string => {
  let link = "";
  fs.readdirSync("./docs/pills").forEach((file: string, index: number) => {
    if (index !== 0) {
      return;
    }
    link = `/pills/${file}/${file}`;
  });
  return link;
};

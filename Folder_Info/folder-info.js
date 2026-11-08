const { readdirSync, statSync } = require("fs");
const input = process.argv[2];
const filePath = input ? input : process.cwd();

const filesCouter = () => {
  let folders = 0;
  let files = 0;
  try {
    const f = readdirSync(filePath);
    for (const element of f) {
      if (statSync(element).isDirectory()) {
        folders++;
      } else {
        files++;
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
  return { folders, files };
};

console.log(filesCouter());

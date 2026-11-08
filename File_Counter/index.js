const fs = require("node:fs/promises");
const path = require("node:path");

const file = process.argv[2];
if (!file) {
  console.log("error: please provide a file path");
  process.exit(1);
}

const fileCounter = async () => {
  try {
    const pathResolve = path.resolve(file);
    const content = await fs.readFile(pathResolve, "utf-8");
    return {
      File: file,
      Lines: content.split("\n").length,
      Words: content.replace(/[\r\n]+/g, " ").split(" ").length,
      Characters: content.replace(/[\r\n]+/g, " ").split("").length,
    };
  } catch (err) {
    console.error(`error: could not read file: ${file}`);
    process.exit(1);
  }
};
fileCounter().then((data) => console.log(data));

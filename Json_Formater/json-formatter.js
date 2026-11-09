const fs = require("node:fs/promises");

const jsonFile = process.argv[2];
const printError = (mess) => {
  console.log(mess);
  process.exit(1);
};
if (!jsonFile) {
  printError("error: please provide a JSON file path.");
}
const isValidJson = (path) => {
  let content = "";
  try {
    content = JSON.parse(path);
  } catch (error) {
    printError(`error: invalid JSON in file: ${jsonFile}`);
  }
  return JSON.stringify(content, null, 2);
};

const main = async () => {
  let text = "";
  try {
    const readFile = await fs.readFile(jsonFile, "utf-8");
    text = isValidJson(readFile);
  } catch (error) {
    printError(`error: could not read file: ${jsonFile}`);
  }
  return text;
};

main().then((data) => {
  console.log(data);
});

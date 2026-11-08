const { readdirSync } = require("fs");
const path = require("path");

const input = process.argv[2];
const filePath = input ? path.resolve(input) : process.cwd();

const filesCounter = () => {
  let obj = {};
  try {
    const f = readdirSync(filePath, { withFileTypes: true });
    if (f.length > 0) {
      obj.Folder = path.basename(f[0].parentPath);
      obj.Path = f[0].parentPath;
      obj.Files = f.filter((files) => files.isFile()).length;
      obj.Folders = f.filter((files) => files.isDirectory()).length;
      return obj;
    }
  } catch (err) {
    console.error(`Error: Could not read folder: ${input}`);
  }
};

console.log(filesCounter());

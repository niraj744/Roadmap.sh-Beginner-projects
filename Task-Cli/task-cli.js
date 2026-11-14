const fs = require("node:fs/promises");
const path = require("node:path");
const fileName = path.resolve("list.json");
const printError = (message) => {
  console.log(message);
  process.exit(1);
};
const updateFile = async (list = []) => {
  if (Object.keys(list).length === 0) {
    try {
      const fileContent = await fs.readFile(fileName, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return 1;
    }
  } else {
    try {
      const write = await fs.writeFile(fileName, JSON.stringify(list), "utf-8");
    } catch (error) {
      printError(error);
    }
  }
};
async function addList() {
  const description = process.argv[3];
  if (!description) printError("Description is required.");
  let result = await updateFile();
  const index = result === 1 ? 1 : result.Lists.length;
  if (result === 1) {
    const addObj = {
      Lists: [
        {
          index,
          description,
          status: "todo",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    };
    await updateFile(addObj);
    console.log("Successfully added list.");
  } else {
    const addObj = {
      index: index + 1,
      description,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    result.Lists.push(addObj);
    await updateFile(result);
    console.log("Successfully added list.");
  }
}
async function updateList() {
  const id = Number(process.argv[3]);
  const description = process.argv[4];
  if (!description || !id) printError("Description, ID are required.");
  let result = await updateFile();
  const isExists = result.Lists.filter((list) => {
    return list.index === id;
  });
  if (isExists.length === 0) printError("List could't found.");
  isExists[0].description = description;
  isExists[0].updatedAt = Date.now();
  const indexOf = result.Lists.findIndex((list) => {
    return list.index === id;
  });
  result.Lists.splice(indexOf, 1, isExists[0]);
  await updateFile(result);
  console.log("Successfully update list.");
}
async function deleteList() {
  const id = Number(process.argv[3]);
  if (!id) printError("ID is required.");
  let result = await updateFile();
  const isExists = result.Lists.filter((list) => {
    return list.index === id;
  });
  if (isExists.length === 0) printError("List could't found.");
  const indexOf = result.Lists.findIndex((list) => {
    return list.index === id;
  });
  result.Lists.splice(indexOf, 1);
  await updateFile(result);
  console.log(`Successfully deleted list of id ${id}.`);
}
async function mark_in_progressList() {
  const id = Number(process.argv[3]);
  if (!id) printError("ID is required.");
  let result = await updateFile();
  const isExists = result.Lists.filter((list) => {
    return list.index === id;
  });
  if (isExists.length === 0) printError("List could't found.");
  isExists[0].status = "in-progress";
  isExists[0].updatedAt = Date.now();
  const indexOf = result.Lists.findIndex((list) => {
    return list.index === id;
  });
  result.Lists.splice(indexOf, 1, isExists[0]);
  await updateFile(result);
  console.log(`Successfully mark in progress list of id ${id}.`);
}
async function doneList() {
  const id = Number(process.argv[3]);
  if (!id) printError("ID is required.");
  let result = await updateFile();
  const isExists = result.Lists.filter((list) => {
    return list.index === id;
  });
  if (isExists.length === 0) printError("List could't found.");
  isExists[0].status = "done";
  isExists[0].updatedAt = Date.now();
  const indexOf = result.Lists.findIndex((list) => {
    return list.index === id;
  });
  result.Lists.splice(indexOf, 1, isExists[0]);
  await updateFile(result);
  console.log(`Successfully mark done list of id ${id}.`);
}
async function ShowAllList() {
  const status = process.argv[3];
  let result = await updateFile();
  let ArrayList = result.Lists;
  if (status) {
    const statusArray = ["todo", "in-progress", "done"];
    if (!statusArray.includes(status))
      printError(
        `Invalid status status should be in one of them todo, in-progress, done`,
      );
    ArrayList = ArrayList.filter((lists) => lists.status === status);
  }
  if (ArrayList.length === 0) console.log([]);
  for (let i = 0; i < ArrayList.length; i++) {
    const element = ArrayList[i];
    element.createdAt = new Date(element.createdAt).toDateString();
    element.updatedAt = new Date(element.updatedAt).toDateString();
    console.log(element);
  }
}
const listCrudOptions = {
  add: addList,
  update: updateList,
  delete: deleteList,
  mark_in_progress: mark_in_progressList,
  done: doneList,
  list: ShowAllList,
};
async function main() {
  const argv = process.argv[2];
  switch (argv) {
    case "add":
      await listCrudOptions.add();
      break;
    case "update":
      await listCrudOptions.update();
      break;
    case "delete":
      await listCrudOptions.delete();
      break;
    case "mark-in-progress":
      await listCrudOptions.mark_in_progress();
      break;
    case "mark-done":
      await listCrudOptions.done();
      break;
    case "list":
      await listCrudOptions.list();
      break;
    case "list done":
      await listCrudOptions.list();
      break;
    case "list todo":
      await listCrudOptions.list();
      break;
    case "list in-progress":
      await listCrudOptions.list();
      break;
    default:
      printError("Invalid argument please give valid options to proceed.");
  }
}
main();

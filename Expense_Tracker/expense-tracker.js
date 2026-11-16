const fs = require("node:fs/promises");
const path = require("node:path");
const fileName = path.resolve("Expense.json");
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
const validator = (obj) => {
  if (!obj.key) printError(`${obj.defaultValue} key is required.`);

  if (!obj.key.startsWith("--"))
    printError(`${obj.defaultValue} key must be start with --`);

  if (obj.key.replace("--", "") !== obj.defaultValue.toLowerCase())
    printError(
      `${obj.defaultValue} must be like --${obj.defaultValue.toLowerCase()}`,
    );

  if (!obj.value) printError(`${obj.defaultValue} is required.`);

  if (obj.isNumber && isNaN(obj.value))
    printError(`${obj.defaultValue} must be number.`);
  return obj.value;
};
const reduce = (array) => {
  const totalExpense = array.reduce((acc, curr) => {
    return acc + Number(curr.amount.replace("$", ""));
  }, 0);
  return totalExpense;
};
async function addExpense() {
  const desKey = process.argv[3];
  const des = process.argv[4];

  const amoukey = process.argv[5];
  const amou = process.argv[6];

  const description = validator({
    key: desKey,
    value: des,
    defaultValue: "Description",
    isNumber: false,
  });
  let amount = validator({
    key: amoukey,
    value: amou,
    defaultValue: "Amount",
    isNumber: true,
  });

  let result = await updateFile();
  const index = result === 1 ? 1 : result.Expenses.length + 1;
  if (result === 1) {
    amount = Number(amount);
    const addObj = {
      Expenses: [
        {
          index,
          description: description,
          amount: `$${amount}`,
          date: Date.now(),
        },
      ],
    };
    await updateFile(addObj);
  } else {
    const addObj = {
      index: index,
      description: description,
      amount: `$${amount}`,
      date: Date.now(),
    };
    result.Expenses.push(addObj);
    await updateFile(result);
  }
  console.log(`Expense added successfully (ID: ${index}})`);
}
async function deleteExpense() {
  const idkey = process.argv[3];
  const idVal = process.argv[4];
  let id = validator({
    key: idkey,
    value: idVal,
    defaultValue: "Id",
    isNumber: true,
  });
  id = Number(id);
  let result = await updateFile();
  const isExists = result.Expenses.filter((list) => {
    return list.index === id;
  });
  if (isExists.length === 0) printError("Expense could't found.");
  const indexOf = result.Expenses.findIndex((list) => {
    return list.index === id;
  });
  result.Expenses.splice(indexOf, 1);
  await updateFile(result);
  console.log(`Expense deleted successfully`);
}
async function ShowAllExpense() {
  let result = await updateFile();
  let ArrayList = result.Expenses;
  if (ArrayList.length === 0) console.log([]);
  for (let i = 0; i < ArrayList.length; i++) {
    const element = ArrayList[i];
    element.date = new Date(element.date).toLocaleDateString();
    console.log({
      ID: element.index,
      Date: element.date,
      Description: element.description,
      Amount: element.amount,
    });
  }
}
async function Summary() {
  const summaryKey = process.argv[3];
  let json = await updateFile();
  if (summaryKey) {
    const summaryValue = process.argv[4];
    const month = validator({
      key: summaryKey,
      value: summaryValue,
      defaultValue: "Month",
      isNumber: true,
    });
    const givenMonthlist = json.Expenses.filter((list) => {
      const monthResult =
        Number(new Date(list.date).getMonth() + 1) === Number(month);
      return monthResult;
    });
    const result = reduce(givenMonthlist);
    console.log(`Total Expenses: $${result}`);
  } else {
    const result = reduce(json.Expenses);
    console.log(`Total Expenses: $${result}`);
  }
}
const expenseObj = {
  add: addExpense,
  delete: deleteExpense,
  list: ShowAllExpense,
  summary: Summary,
};
async function main() {
  const argv = process.argv[2];
  switch (argv) {
    case "add":
      await expenseObj.add();
      break;
    case "delete":
      await expenseObj.delete();
      break;
    case "list":
      await expenseObj.list();
      break;
    case "summary":
      await expenseObj.summary();
      break;
    default:
      printError("Invalid argument please give valid options to proceed.");
  }
}
main();

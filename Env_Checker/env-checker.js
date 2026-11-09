const printError = (mess) => {
  console.log(mess);
  process.exit(1);
};
const main = () => {
  const existsEnv = [];
  const nonExistsEnv = [];
  const array = process.argv.slice(2);
  if (!array.length) {
    printError("error: please provide at least one environment variable name");
  }
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (process.env[element]) {
      existsEnv.push(element);
    } else {
      nonExistsEnv.push(element);
    }
  }
  return { existsEnv, nonExistsEnv };
};
const { existsEnv, nonExistsEnv } = main();
if (existsEnv.length > 0) {
  console.log(
    `Set: ${existsEnv.join(" ")} \nAll required environment variables are set.`,
  );
}
if (nonExistsEnv.length > 0) {
  printError(`error: missing environment variables: ${nonExistsEnv.join(" ")}`);
}

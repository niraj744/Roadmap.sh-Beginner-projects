const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const GameWelcome = `Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.
Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`;
const invalidChoice = "Invalid choice, Choice must be 1, 2, or 3.";

async function ask(choices) {
  const rl = readline.createInterface({ input, output });
  try {
    while (true) {
      const answer = await rl.question("Enter your choice: ");
      if (choices[answer]) {
        console.log(`Great! You have selected the ${choices[answer][1]} difficulty level.
Let's start the game!`);
        return choices[answer];
      }
      console.log(invalidChoice);
    }
  } finally {
    rl.close();
  }
}
async function guessNumber(computerRandomNumber, attempt) {
  console.log(computerRandomNumber);
  const rl = readline.createInterface({ input, output });
  let maximumNumberToGuess = 0;
  try {
    while (attempt) {
      let answer = await rl.question("Enter your guess: ");
      answer = Number(answer);
      computerRandomNumber = Number(computerRandomNumber);
      if (answer === computerRandomNumber) {
        console.log(
          `Congratulations! You guessed the correct number in ${maximumNumberToGuess} attempts`,
        );
        return;
      } else if (attempt && answer > computerRandomNumber) {
        console.log(`Incorrect! The number is less than ${answer}.`);
      } else {
        console.log(`Incorrect! The number is greater than ${answer}.`);
      }
      attempt--;
      maximumNumberToGuess++;
    }
    console.log("Oh! you have failed to guess number in given attempts.");
  } finally {
    rl.close();
  }
}
async function main() {
  const computerRandomNumber = Math.floor(Math.random() * 100);
  console.log(GameWelcome);
  const choices = { 1: [10, "Easy"], 2: [5, "Medium"], 3: [3, "Hard"] };
  const attempt = await ask(choices);
  await guessNumber(computerRandomNumber, attempt[0]);
}
main();

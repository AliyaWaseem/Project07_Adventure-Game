#! \usr\bin\env node
import inquirer from "inquirer";
import chalk from "chalk";
//Title Description
console.log(chalk.bold.blueBright("\n \t CLI-Adventure-Game-Application"));
console.log("*".repeat(50));
//=================game variables==============
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToAvenger = 25;
//=================Player variables=================
let avengerHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPortion = 3;
let healthPortionHealAmount = 30;
let healthPortionDropChance = 50;
//=================While loop condition=================
let gameRunning = true;
console.log(chalk.bold.greenBright("\n \t\t Welcome to DeadZone"));
console.log("*".repeat(50));
Game: while (gameRunning) {
    // Generate random enemy
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(chalk.yellow(`# ${chalk.red(enemy)} has appeared #\n`));
    while (enemyHealth > 0) {
        console.log(chalk.greenBright.bold(`Your Health: ${chalk.yellowBright(avengerHealth)}`));
        console.log(chalk.red.bold(`${chalk.red(enemy)} Health: ${chalk.yellowBright(enemyHealth)}`));
        let options = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["1. Attack", "2. Heal", "3. Run"]
        });
        if (options.action === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToAvenger = Math.floor(Math.random() * enemyAttackDamageToAvenger + 1);
            enemyHealth -= damageToEnemy;
            avengerHealth -= damageToAvenger;
            console.log(chalk.greenBright.bold(`Congratulations! You strike the" ${chalk.red(enemy)} for ${chalk.yellowBright(damageToEnemy)} points.`));
            console.log(chalk.yellow.bold(`${chalk.red(enemy)} strikes you for ${chalk.green(damageToAvenger)} points.`));
            if (avengerHealth < 1) {
                console.log(chalk.red.bold("You have lost the lives. Game Over!"));
                break Game;
            }
        }
        else if (options.action === "2. Heal") {
            if (numHealthPortion > 0) {
                avengerHealth += healthPortionHealAmount;
                numHealthPortion--;
                console.log(chalk.blueBright(`You heal for ${chalk.yellow(healthPortionHealAmount)}`));
                console.log(chalk.yellowBright(`Now! You have ${chalk.green(avengerHealth)} health.`));
                console.log(chalk.greenBright(`You have ${chalk.red(numHealthPortion)} health portions left.`));
            }
            else {
                console.log(chalk.red.bold("You don't have any health portions left."));
            }
        }
        else if (options.action === "3. Run") {
            console.log(chalk.yellowBright.bold.italic(`You run away from the ${chalk.red.bold(enemy)} enemy.`));
            continue Game;
        }
    }
    if (avengerHealth < 1) {
        console.log(chalk.redBright.bold("You are out from the battle! you are too weak."));
        break Game;
    }
    console.log(chalk.greenBright.bold(`${chalk.red(enemy)} has defeated!`));
    console.log(chalk.magentaBright.bold(`You have ${chalk.yellow(avengerHealth)} health.`));
    let dropChance = Math.floor(Math.random() * 100 + 1);
    if (dropChance < healthPortionDropChance) {
        numHealthPortion++;
        console.log(chalk.green.bold(`You found a health portion! You now have ${chalk.yellow(numHealthPortion)} health portions.`));
        console.log(chalk.magentaBright.bold(`Your health is ${chalk.yellow(avengerHealth)}`));
        console.log(chalk.yellow.bold(`Your health Portion is: ${chalk.green(numHealthPortion)}`));
    }
    let userOption = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "Do you want to play again?",
        choices: ["1. Yes", "2. No"]
    });
    if (userOption.action === "1. Yes") {
        console.log(chalk.green.bold.underline("\n You are  continue on your adventure!"));
    }
    else {
        console.log(chalk.greenBright.bold.italic("\n Goodbye! You successfully Exit from DeadZone!"));
        break;
    }
    console.log(chalk.cyanBright.bold("\n Thanks for playing DeadZone again!\n"));
}

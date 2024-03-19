require('dotenv').config();
const os = require('os');
const chalk = require('chalk');

// console.log(process.env.URL)
// console.log(process.env.HOST)
// console.log(process.env.PORT)


// console.log('Error: Invalid id note')
// console.log('Error: Invalid form data')

console.log(chalk.red.bold.italic('Text'))
console.log(chalk.bold.red.italic('Text'))
console.log(chalk.red('Text'))
console.log(chalk.yellow.bgBlue('Text'))

console.log(chalk.green(
    `
        Green line
        ${chalk.red('Red line')}
        ${chalk.yellow('Yellow line')}
        ${chalk.reset.bold('Text')}
    `
))

console.log(chalk.rgb(10, 125, 0).bold('Text'))
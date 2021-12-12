const chalk = require('chalk')

const nota = 9

if (nota >= 7) {
  console.log(chalk.green('Aprovado'))

}else {
  console.log(chalk.bgRed.black('Reprovado'))
}
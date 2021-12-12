import inquirer from 'inquirer'
import chalk from 'chalk';

inquirer.prompt([
  {name:'nome',message: 'Qual seu nome'},
  {name:'idade',message: 'Qual sua idade'}
])
.then((answers) => {
  const response = `O nome do usuario é ${answers.nome} e ele tem ${answers.idade} anos`

  console.log(chalk.bgYellow.black(response))
})
.catch((err) => {console.log(err)});

//console.log(chalk.bgRed.black('Reprovado'))
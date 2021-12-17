//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

//modulos internos
import fs from 'fs'

operation();

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que voce deseja fazer?',
      choices: [
        'Criar Conta',
        'Consultar Saldo',
        'Depositar',
        'Sacar',
        'Sair',
      ]
    }
  ])
    .then((response) => {
      const action = response['action']

      if (action === 'Criar Conta') {
        createAccount()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Sacar') {
        withdraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
        process.exit()
      }
    })
    .catch((err) => { console.log(err) })
}

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black('Parabens por escolher nosso banco'))
  console.log(chalk.green('Defina as opcoes da sua conta a seguir'))
  buildAccount();
}

function buildAccount() {
  inquirer.prompt([
    {
      name: 'AccountName',
      message: 'Digite um nome para a sua conta'
    }
  ])
    .then((response) => {
      const accountName = response['AccountName']
      console.info(accountName)

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'))
        buildAccount()
        return
      }

      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', function (err) {
        console.log(err)
      })

      console.log(chalk.green('Parabens sua conta foi criada'))
      operation()
    })
    .catch((err) => { console.log(err) })
}

function deposit() {

  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o noem da sua conta?'
    }
  ])
    .then((response) => {
      const account = response['accountName']

      if (!checkAccount(account)) {
        return deposit()
      }

      inquirer.prompt([
        {
          name: 'amount',
          message: 'Quanto voce quer depositar?'
        }
      ])
        .then((response) => {
          const amount = response['amount']

          addAmount(account, amount)
          operation()

        })
        .catch((err) => { console.log(err) })
    })
    .catch((err) => { console.log(err) })
}

function checkAccount(account) {
  if (!fs.existsSync(`accounts/${account}.json`)) {
    console.log(chalk.bgRed.black('Esta conta nao existe'))
    return false
  }

  return true
}

function addAmount(accountName, amount) {
  const account = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
    return deposit()
  }

  account.balance = parseFloat(amount) + parseFloat(account.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(account),
    function (err) {
      console.log(chalk.bgRed.black(err))
    }
  )

  console.log(chalk.green(`o valor foi de R$${amount} foi depositado`))
}

function getAccount(account) {
  const accountJSON = fs.readFileSync(`accounts/${account}.json`, {
    encoding: 'utf8',
    flag: 'r'
  })

  return JSON.parse(accountJSON)
}

function getAccountBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o noem da sua conta?',
    }
  ])
    .then((response) => {
      const accountName = response['accountName']

      if (!checkAccount(accountName)) {
        return getAccountBalance()
      }

      const accountData = getAccount(accountName)

      console.log(chalk.bgBlue.black(`Saldo da sua conta é R$${accountData.balance}`))

      operation()
    })
    .catch((err) => { console.log(err) })
}

function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o noem da sua conta?',
    }
  ])
    .then((response) => {
      const accountName = response['accountName']

      if (!checkAccount(accountName)) {
        return withdraw()
      }

      inquirer.prompt([
        {
          name: 'amount',
          message: 'Quanto voce deseja sacar?'
        }
      ])
        .then((response) => {
          removeAmount(accountName, response['amount'])
        })
        .catch((error) => { console.log(error) })

    })
    .catch((err) => { console.log(err) })
}

function removeAmount(account, amount) {
  const accountData = getAccount(account)

  if (!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro tente novamente mais tarde'))
    return withdraw()
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponivel'))
    return withdraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${account}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    },
  )

  console.log(chalk.green(`Foi realizado um saque da sua conta no valor de R$${amount}`))

  operation()
}
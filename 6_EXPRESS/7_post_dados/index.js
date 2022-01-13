const express = require('express');
const app = express();
const port = 3000

const path = require('path');

app.use(express.urlencoded({
  extended: true,
}))

const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {
  const { name, age } = req.body

  console.log(`nome do usuario é ${name} e ele tem ${age} anos`)

  res.sendFile(`${basePath}/userForm.html`)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id

  console.log(`Estamos buscando pelo usuario: ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log('rodando')
});


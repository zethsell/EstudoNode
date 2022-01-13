const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/books/edit/:id', (req, res) => {

  const id = req.params.id

  const sql = `SELECT * FROM books WHERE  id = ${id}`

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return
    }

    const book = data[0]

    res.render('editbook', { book })
  })

})

app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE  id = ${id}`

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return
    }

    const book = data[0]

    res.render('book', { book })
  })
})

app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books"

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return
    }

    const books = data

    res.render('books', { books })
  })
})

app.post('/books/updatebook', (req, res) => {

  const { id, title, pagesqty } = req.body

  const sql = `UPDATE books  SET title = '${title}',  pagesqty = '${pagesqty}' WHERE id = ${id}`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books')
  })
})

app.post('/books/insertbook', (req, res) => {

  const { title, pagesqty } = req.body

  const sql = `INSERT INTO books (title,pagesqty) VALUE ('${title}','${pagesqty}')`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/')
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM books WHERE  id = ${id}`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books')
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'estudo_node',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('conectou ao mysql!')
  app.listen(3000)

})
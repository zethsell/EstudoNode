const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

  const sql = `SELECT * FROM books WHERE  ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err, data) {
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

  const sql = `SELECT * FROM books WHERE   ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err, data) {
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
  pool.query(sql, function (err, data) {
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

  const sql = `UPDATE books  SET ?? = ?,  ?? = ? WHERE ?? = ?`
  const data = ['title', 'pagesqty', 'id', title, pagesqty, id]
  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books')
  })
})

app.post('/books/insertbook', (req, res) => {

  const { title, pagesqty } = req.body

  const sql = `INSERT INTO books (??,??) VALUE (?,?)`
  const data = ['title', 'pagesqty', title, pagesqty]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/')
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM books WHERE  ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books')
  })
})

app.listen(3000)


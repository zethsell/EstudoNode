const express = require('express')
const exphbs = require('express-handlebars')

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.get('/dashboard', (req, res) => {

  const items = ['a', 'b', 'c']

  res.render('dashboard', {items})
})

app.get('/', (req, res) => {

  const user = {
    name: 'Marcio',
    surname: 'Rodrigues'
  }

  const auth = true;

  const approved = true;

  res.render('home', { user, auth, approved });
})


app.listen(3000, () => {
  console.log('listening on port 3000')
})
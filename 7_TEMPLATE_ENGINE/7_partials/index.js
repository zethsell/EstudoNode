const express = require('express')
const exphbs = require('express-handlebars')

const app = express();

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/dashboard', (req, res) => {

  const items = ['a', 'b', 'c']

  res.render('dashboard', { items })
})

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender Node.js',
    category: 'Javascript',
    body: 'Este artigo vai te ajudar a aprender Node.js',
    comments: 4
  }

  res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {

  const posts = [
    {
      title: 'Aprender Node.js',
      category: 'Javascript',
      body: 'Este artigo vai te ajudar a aprender Node.js',
      comments: 4
    },
    {
      title: 'Aprender PHP',
      category: 'PHP',
      body: 'Este artigo vai te ajudar a aprender Express.js',
      comments: 5
    },
    {
      title: 'Aprender Python',
      category: 'Python',
      body: 'Este artigo vai te ajudar a aprender React.js',
      comments: 1
    }
  ]

  res.render('blog', { posts })
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
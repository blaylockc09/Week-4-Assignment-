//
// Chris Blaylock
// 09/16/2020
//
const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const fortunes = [
    "IT'S DANGEROUS TO GO ALONE! TAKE THIS.",
    "IT'S A SECRET TO EVERYBODY.",
    "GRUMBLE,GRUMBLE...",
    "Hey! Listen!",
    "You saved Hyrule and you are a real hero!",
  ]


// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))
  app.set('view engine', 'handlebars')


const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', { fortune: randomFortune })
  })

// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
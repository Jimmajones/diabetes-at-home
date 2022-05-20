require('./models')

const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')

const app = express()

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: false })) // only needed for URL-encoded input

// Configure Handlebars.
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
    helpers: require('./hbs-helpers'),
  })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))

// flash messages for failed login
app.use(flash())

// Track authenticated users through login sessions
app.use(
  session({
    // The secret used to sign session cookies (ADD ENV VAR)
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    name: 'demo', // The cookie name (CHANGE THIS)
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: 'strict',
      httpOnly: true,
      secure: app.get('env') === 'production',
    },
  })
)

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // Trust first proxy
}

// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))

// Load authentication router
const authRouter = require('./routes/authRouter')
app.use(authRouter)

// Serve up static pages.
app.get('/about-diabetes', (req, res) => {
  if (!req.user || req.user.role == 'patient') {
    res.render('about-diabetes', {
      layout: 'patient',
      title: 'About Diabetes',
      loggedin: req.isAuthenticated(),
    })
  } else {
    res.render('about-diabetes', {
      layout: 'clinician',
      title: 'About Diabetes',
    })
  }
})

app.get('/about-website', (req, res) => {
  if (!req.user || req.user.role == 'patient') {
    res.render('about-website', {
      layout: 'patient',
      title: 'About Website',
      loggedin: req.isAuthenticated(),
    })
  } else {
    res.render('about-website', {
      layout: 'clinician',
      title: 'About Website',
    })
  }
})

// Route not found
app.get('*', (req, res) => {
  res.render('404', {
    layout: false,
    title: 'Error 404',
  })
})

// Tells the app to listen on port 3000 and logs that information to the console.
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express app "Diabetes@Home" listening on port %d.',
    server.address().port
  )
})

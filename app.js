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
  res.render('about-diabetes', {
    layout: 'patient.hbs',
    title: 'About Diabetes',
    loggedin: req.isAuthenticated(),
  })
})

app.get('/about-website', (req, res) => {
  res.render('about-website', {
    layout: 'patient.hbs',
    title: 'About Website',
    loggedin: req.isAuthenticated(),
  })
})

// Route not found
app.get('*', (req, res) => {
  res.render('404', {
    layout: 'patient.hbs',
    title: 'Error 404',
  })
})

/*
const patient_warning = {
  high_glucose_level_over:
    "The patient's blood flucose level is currently over the safety threshold, please check again.",
  weight_over:
    "The patient's weight is currently over the safety threshold, please check again.",
  insulin_over:
    "The patient's insulin doses is currently over the safety threshold, please check again.",
  exercise_over:
    "The patient's exercise steps is currently over the safety threshold, please check again.",
  high_glucose_level_missing:
    'The patient has not filled in their blood glucose level, please check again.',
  weight_missing:
    'The patient has not filled in their weight, please check again.',
  insulin_missing:
    'The patient has not filled in their insulin, please check again.',
  exercise_missing:
    'The patient has not filled in their exercise steps, please check again.',
}

const individual_patient_data = {
  id: 1,
  first_name: 'gerald',
  last_name: 'Helman',
  profile_image: '...',
  status: 'good',
  required_data: [
    {
      data_type: 'blood_glucose_level',
      display_text: 'Blood Glucose Level (nmo/L)',
      completed: true,
    },
    {
      data_type: 'weight',
      display_text: 'Weight (kg)',
      completed: true,
    },
    {
      data_type: 'insulin_doses',
      display_text: 'Insulin (doses)',
      completed: false,
    },
    {
      data_type: 'exercise_steps',
      display_text: 'Exercise (steps)',
      completed: true,
    },
  ],
  daily_data: [
    {
      blood_glucose_level: {
        name: 'blood_glucose_level',
        warning: null,
        value: 4.8,
        comment: 'lorem ipsum foo bar',
      },
      weight: {
        name: 'weight',
        warning: null,
        value: 68,
        comment: 'lorem ipsum foo bar',
      },
      insulin: {
        name: 'insulin',
        warning: null,
        value: 2,
        comment: 'lorem ipsum foo bar',
      },
      exercise: {
        name: 'exercise',
        warning: null,
        value: 4359,
        comment: 'lorem ipsum foo bar',
      },
      date_recorded: '10/1/2022',
    },
    {
      blood_glucose_level: {
        name: 'blood_glucose_level',
        warning: null,
        value: 5.0,
        text: null,
      },
      weight: {
        name: 'weight',
        warning: null,
        value: 68,
        text: null,
      },
      insulin: {
        name: 'insulin',
        warning: null,
        value: 5,
        text: null,
      },
      exercise: {
        name: 'exercise',
        warning: null,
        value: 10000,
        text: null,
      },
      date_recorded: '11/1/2022',
    },
  ],
}

const patient_data = [
  {
    id: 1,
    first_name: 'Gerald',
    last_name: 'Helman',
    profile_image: 'gerald.svg',
    status: 'good',
    data: {
      blood_glucose_level: {
        name: 'Blood glucose level',
        warning: null,
        value: 4.8,
        text: null,
      },
      weight: {
        name: 'Weight',
        warning: null,
        value: 68,
        text: null,
      },
      insulin: {
        name: 'Insulin',
        warning: null,
        value: 2,
        text: null,
      },
      exercise: {
        name: 'Exercise',
        warning: null,
        value: 4359,
        text: null,
      },
      date_recorded: '10/1/2022',
    },
  },
  {
    id: 2,
    first_name: 'Brian',
    last_name: 'Adinata',
    profile_image: 'brian.svg',
    status: 'both',
    data: {
      blood_glucose_level: {
        name: 'Blood glucose level',
        warning: null,
        value: 5.8,
        text: null,
      },
      weight: {
        name: 'Weight',
        warning: 'incomplete',
        value: null,
        text: patient_warning.weight_missing,
      },
      insulin: {
        name: 'Insulin',
        warning: 'over-threshold',
        value: 10,
        text: patient_warning.insulin_over,
      },
      exercise: {
        name: 'Exercise',
        warning: null,
        value: 4359,
        text: null,
      },
      date_recorded: '15/4/2022',
    },
  },
]
*/

// Tells the app to listen on port 3000 and logs that information to the console.
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express app "Diabetes@Home" listening on port %d.',
    server.address().port
  )
})

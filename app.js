// Import external packages.
const express = require('express')
const exphbs = require('express-handlebars')

// Set up the application as an Express app.
const app = express()

// Configure Handlebars.
app.engine(
  'hbs',
  exphbs.engine({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')
app.use(express.static('public'))

// Link to our routers.
const patientRouter = require('./routes/patientRouter')
app.use('/patient', patientRouter)

const clinicianRouter = require('./routes/clinicianRouter')
app.use('/clinician', clinicianRouter)

// Our "home page" - currently the About Diabetes page.
app.get('/', (req, res) => {
  res.render('about-diabetes.hbs', { layout: 'patient.hbs' })
})

// Serve up static pages.
app.get('/about-diabetes', (req, res) => {
  res.render('about-diabetes', {
    layout: 'patient.hbs',
    title: 'About Diabetes',
  })
})

app.get('/about-website', (req, res) => {
  res.render('about-website', {
    layout: 'patient.hbs',
    title: 'About Website',
  })
})

/* TODO: data for testing only. delete later */
// tmp data: things patient need to record
const data = [
  {
    id: 'glucose',
    name: 'Blood glucose levels (nmo/L)',
  },
  {
    id: 'weight',
    name: 'Weight (kg)',
  },
  {
    id: 'insulin',
    name: 'Insulin (doses)',
  },
  {
    id: 'exercise',
    name: 'Exercise (steps)',
  },
]

const daily_data = [
  {
    blood_glucose_level: {
      value: Number,
      comment: String,
      time: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    weight: {
      value: Number,
      comment: String,
      time: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    insulin_doses: {
      value: Number,
      comment: String,
      time: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    exercise_steps: {
      value: Number,
      comment: String,
      time: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    date_recorded: Date,
  },
]

//sample tester data for clinician

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

const patient_data = [
  {
    id: 1,
    first_name: 'gerald',
    last_name: 'Helman',
    profile_image: '...',
    status: 'good',
    data: {
      blood_glucose_level: {
        name: 'blood_glucose_level',
        warning: null,
        value: 4.8,
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
        value: 2,
        text: null,
      },
      exercise: {
        name: 'exercise',
        warning: null,
        value: 4359,
        text: null,
      },
    },
  },
  {
    id: 2,
    first_name: 'brian',
    last_name: 'Adinata',
    profile_image: '...',
    status: 'both',
    data: {
      blood_glucose_level: {
        name: 'blood_glucose_level',
        warning: null,
        value: 5.8,
        text: null,
      },
      weight: {
        name: 'weight',
        warning: 'incomplete',
        value: null,
        text: patient_warning.weight_missing,
      },
      insulin: {
        name: 'insulin',
        warning: 'over-threshold',
        value: 10,
        text: patient_warning.insulin_over,
      },
      exercise: {
        name: 'exercise',
        warning: null,
        value: 4359,
        text: null,
      },
    },
  },
]

/**********************************************/

// other pages
app.get('/patient-dashboard', (req, res) => {
  res.render('patient-dashboard.hbs', {
    layout: 'patient.hbs',
    title: 'Dashboard',
    username: 'Pat', // replace with screen name
    health_data: data,
    daily_data: daily_data,
    message: 'Hi Pat - good job for reaching 50,000 steps this week! 😃', // replace with support message
  })
})

app.get('/clinician-dashboard', (req, res) => {
  res.render('clinician-dashboard.hbs', {
    layout: 'clinician.hbs',
    patient_data: patient_data,
  })
})

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 3000, () => {
  console.log('Diabetes@Home app is running!')
})

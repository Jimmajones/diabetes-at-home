// Import external packages.
const express = require('express')
const exphbs = require('express-handlebars')

require('./models')

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
    },
    {
      data_type: 'weight',
      display_text: 'Weight (kg)',
    },
    {
      data_type: 'insulin_doses',
      display_text: 'Insulin (doses)',
    },
    {
      data_type: 'exercise_steps',
      display_text: 'Exercise (steps)',
    },
  ],
  daily_data: [
    {
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
    first_name: 'gerald',
    last_name: 'Helman',
    profile_image: '...',
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
    first_name: 'brian',
    last_name: 'Adinata',
    profile_image: '...',
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

/**********************************************/

// other pages
app.get('/patient-dashboard', (req, res) => {
  res.render('patient-dashboard.hbs', {
    layout: 'patient.hbs',
    title: 'Dashboard',
    // pass in the individual patient's data (get patient by id?)
    data: individual_patient_data,
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
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express app "Diabetes@Home" listening on port %d.',
    server.address().port
  )
})

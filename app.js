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
    id: "glucose",
    name: "Blood glucose levels (nmo/L)",
  },
  {
    id: "weight",
    name: "Weight (kg)",
  },
  {
    id: "insulin",
    name: "Insulin (doses)",
  },
  {
    id: "exercise",
    name: "Exercise (steps)",
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
    }
]
/**********************************************/

// other pages
app.get('/patient-dashboard', (req, res) => {
    res.render('patient-dashboard.hbs', {
        layout: 'patient.hbs',
        title: 'Dashboard',
        username: 'Alice',
        health_data: data,
        daily_data: daily_data,
    })
})

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes@Home app is running!')
})

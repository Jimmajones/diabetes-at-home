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

// other pages
app.get('/patient-dashboard', (req, res) => {
    res.render('patient-dashboard.hbs', {
        layout: 'patient.hbs',
        title: 'Dashboard',
        username: 'Alice',
    })
})

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Diabetes@Home app is running!')
})

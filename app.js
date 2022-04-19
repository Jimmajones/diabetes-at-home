// Import external packages.
const express = require('express')
const exphbs = require("express-handlebars")

// Set your app up as an express app
const app = express()

// Configure Handlebars.
app.engine("hbs", exphbs.engine({
	defaultlayout: "patient", // it doesn't work???
	extname: "hbs"
}))
app.set("view engine", "hbs")
app.use(express.static("public"))

// Our "home page" - currently the About Diabetes page.
app.get('/', (req, res) => {
  res.render("about_diabetes.hbs", {layout: 'clinician.hbs'})
})

// Serve up static pages.
app.get('/about_diabetes.html', (req, res) => {
  res.render("about_diabetes.hbs", {layout: 'patient.hbs', title: 'About Diabetes'})
})

app.get('/about_website.html', (req, res) => {
	res.render("about_website.hbs", {layout: 'patient.hbs', title: 'About Website'})
})

// Tells the app to listen on port 3000 and logs that information to the console.
app.listen(process.env.PORT || 3000, () => { 
  console.log('The library app is running!') 
}) 

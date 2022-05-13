const passport = require('passport')
const express = require('express')

const authRouter = express.Router()
const authController = require('../controllers/authController')

// Login page (with failure message displayed upon login failure)
authRouter.get('/login', (req, res) => {
  res.render('login', { flash: req.flash('error'), layout: 'patient.hbs' })
})

// redirect authorized user to either patient or clinician dashboard
authRouter.get('/home', authController.isAuthenticated, (req, res) => {
  if (req.user) {
    if (req.user.role === 'patient') {
      return res.redirect('/patient')
    } else if (req.user.role === 'clinician') {
      return res.redirect('/clinician')
    }
  }
  // otherwise redirect to login page
  return res.redirect('/login')
})

// only unauthorized user can access home page
authRouter.get('/', authController.isNotAuthenticated, (req, res) => {
  res.render('home', { layout: false })
})

// ensure that only the user with authorized role can access relevant page
const patientRouter = require('./patientRouter')
authRouter.use('/patient', authController.isPatient, patientRouter)
const clinicianRouter = require('./clinicianRouter')
authRouter.use('/clinician', authController.isClinician, clinicianRouter)

// Handle login
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

// Handle logout
authRouter.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = authRouter

const passport = require('passport')
const express = require('express')

const authRouter = express.Router()
const authController = require('../controllers/authController')

// only unauthorized user can access home page and login page
// Login page (with failure message displayed upon login failure)
authRouter.get('/login', authController.isNotAuthenticated, (req, res) => {
  res.render('login', { flash: req.flash('error'), layout: 'patient.hbs' })
})
authRouter.get('/', authController.isNotAuthenticated, (req, res) => {
  res.render('home', { layout: false })
})

// if authorized, redirect to either patient or clinician dashboard
authRouter.get('/home', (req, res) => {
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

// ensure that only the user with authorized role can access relevant page
const patientRouter = require('./patientRouter')
authRouter.use('/patient', authController.isPatient, patientRouter)
const clinicianRouter = require('./clinicianRouter')
authRouter.use('/clinician', authController.isClinician, clinicianRouter)

// Handle login
authRouter.post('/login', (req, res, next) => {
  switch (req.body.role) {
    // if the user is patient, redirect to patient dashboard
    case 'patient':
      passport.authenticate('patient', {
        successRedirect: '/patient',
        failureRedirect: '/login',
        failureFlash: true,
      })(req, res, next)
      break
    // if the user is clinician, redirect to clinician dashboard
    case 'clinician':
      passport.authenticate('clinician', {
        successRedirect: '/clinician',
        failureRedirect: '/login',
        failureFlash: true,
      })(req, res, next)
      break
  }
})

// Handle logout
authRouter.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = authRouter

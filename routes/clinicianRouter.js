const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

// Useful for debugging.
//clinicianRouter.get('/', clinicianController.getAllClinicians)

clinicianRouter.get('/dashboard', clinicianController.viewAllPatients)

clinicianRouter.get('/register-patient', clinicianController.viewRegister)

module.exports = clinicianRouter

const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

// Useful for debugging.
//patientRouter.get('/', patientController.getAllPatients)

patientRouter.get('/dashboard/:patient_id', patientController.viewDashboard)

patientRouter.post(
  '/dashboard/:patient_id/add',
  patientController.addHealthRecord
)

module.exports = patientRouter

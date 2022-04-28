const express = require('express')
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false})

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

// Useful for debugging.
patientRouter.get('/', patientController.getAllPatients)

patientRouter.get('/:patient_id', patientController.viewDashboard)

patientRouter.post('/:patient_id', patientController.addHealthRecord)

// peopleRouter.post('/:patient_id', patientController.recordData)

module.exports = patientRouter

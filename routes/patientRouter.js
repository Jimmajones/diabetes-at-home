const express = require('express')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

// Useful for debugging.
patientRouter.get('/', patientController.getAllPatients)

patientRouter.get('/dashboard', patientController.viewDashboard)

patientRouter.post(
  '/dashboard',
  urlencodedParser,
  patientController.addHealthRecord
)

module.exports = patientRouter

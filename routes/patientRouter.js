const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

// Useful for debugging.
patientRouter.get('/', patientController.getAllPatients)

patientRouter.get('/dashboard', patientController.viewDashboard)

patientRouter.get('/dashboard/uploadRecord', patientController.addHealthRecord)

module.exports = patientRouter

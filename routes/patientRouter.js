const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/', patientController.getAllPatients)

patientRouter.get('/:patient_id', patientController.getPatientById)

module.exports = patientRouter
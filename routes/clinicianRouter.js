const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.getAllClinicians)

clinicianRouter.get(
  '/patientOverview/:clinician_id',
  clinicianController.getAllPatientsOf
)

module.exports = clinicianRouter

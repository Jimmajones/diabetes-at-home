const express = require('express')
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.viewAllPatients)

clinicianRouter.get('/register-patient', clinicianController.viewRegister)

// clinicianRouter.get('/patient-profile', clinicianController.viewProfile)

clinicianRouter.get(
  '/patient-profile/:username',
  clinicianController.viewProfile
)

// Search patient
// clinicianRouter.post('/', clinicianController.viewProfile)

clinicianRouter.get(
  '/patient-comments',
  clinicianController.viewPatientComments
)

clinicianRouter.post(
  '/patient-profile/set-thresholds/:patient_id',
  clinicianController.setThresholds
)

clinicianRouter.post(
  '/patient-profile/clinical-note/:patient_id',
  clinicianController.addClinicalNote
)

clinicianRouter.post(
  '/patient-profile/support-message/:patient_id',
  clinicianController.supportMessage
)

clinicianRouter.post('/register-patient', clinicianController.addOnePatient)

module.exports = clinicianRouter

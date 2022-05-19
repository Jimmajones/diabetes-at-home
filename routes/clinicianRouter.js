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

// clinicianRouter.get('/profile-setting', clinicianController.profileSetting)

clinicianRouter.get(
  '/patient-comments',
  clinicianController.viewPatientComments
)

clinicianRouter.post(
  '/patient-profile/set-thresholds/:patient_id',
  clinicianController.setThresholds
)

clinicianRouter.post(
  '/patient-profile/support-message/:patient_id',
  clinicianController.supportMessage
)
module.exports = clinicianRouter

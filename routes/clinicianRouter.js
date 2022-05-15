const express = require('express')
const clinicianRouter = express.Router()
const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.viewAllPatients)

clinicianRouter.get('/register-patient', clinicianController.viewRegister)

clinicianRouter.get('/patient-profile', clinicianController.viewProfile)

clinicianRouter.get('/profile-setting', clinicianController.profileSetting)

clinicianRouter.get(
  '/patient-comments',
  clinicianController.viewPatientComments
)

module.exports = clinicianRouter

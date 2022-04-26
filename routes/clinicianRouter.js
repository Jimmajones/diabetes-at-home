const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.getAllClinicians)

module.exports = clinicianRouter

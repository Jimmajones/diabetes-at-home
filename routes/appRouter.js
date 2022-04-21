const express = require('express')

const appRouter = express.Router()

const appController = require('../controllers/appController')

appRouter.get('/patients', appController.getAllPatientData)

appRouter.get('/clinicians', appController.getAllClinicianData)

module.exports = appRouter

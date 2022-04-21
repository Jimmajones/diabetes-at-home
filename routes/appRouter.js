const express = require('express')

const appRouter = express.Router()

const appController = require('../controllers/appController')

appRouter.get('/patients', appController.getAllClinicianData)

appRouter.get('/clinicians', appController.getAllPatientData)

module.exports = appRouter

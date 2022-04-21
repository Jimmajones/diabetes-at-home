const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/', patientController.getAllData)

module.exports = patientRouter

const express = require('express')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

patientRouter.get('/', patientController.viewDashboard)

patientRouter.post('/', urlencodedParser, patientController.addHealthRecord)

module.exports = patientRouter

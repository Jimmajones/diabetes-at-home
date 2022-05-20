const express = require('express')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

patientRouter.get('/', patientController.viewDashboard)

patientRouter.post('/', urlencodedParser, patientController.addHealthRecord)

patientRouter.get('/leaderboard', patientController.viewLeaderboard)

patientRouter.get('/settings', patientController.viewSettings)

patientRouter.post('/settings', patientController.changeSettings)

module.exports = patientRouter

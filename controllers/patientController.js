const patientData = require('../models/patientModel')

const getAllData = (req, res) => {
    res.send(patientData)
}

module.exports = {
    getAllData,
}

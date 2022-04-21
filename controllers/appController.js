const patientData = require('../models/patientModel')
const clinicianData = require('../models/clinicianModel')

const getAllPatientData = (req, res) => {
    res.send(patientData)
}

const getAllClinicianData = (req, res) => {
    res.send(clinicianData)
}

module.exports = {
    getAllClinicianData,
    getAllPatientData,
}

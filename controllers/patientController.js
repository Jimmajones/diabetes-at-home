const Patient = require('../models/patients')

const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.send(patients)
    } catch (err) {
        return next(err)
    }
}

const getPatientById = async(req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.patient_id).lean()
        if (!patient) {
            // No patient found in database
            return res.sendStatus(404)
        }
        return res.send(patient)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllPatients,
    getPatientById
}
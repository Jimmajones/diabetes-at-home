const Patient = require('../models/patients')
const Clinician = require('../models/clinicians')

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

const getClinician = async(req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.patient_id).lean()
        const clinician = await Clinician.findById(patient.clinician_id).lean()
        return res.send(clinician)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientById,
    getClinician
}
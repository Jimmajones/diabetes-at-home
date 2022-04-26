const Patient = require('../models/patients')
const Clinician = require('../models/clinicians')

// Get all clinicians.
const getAllClinicians = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        return res.send(clinicians)
    } catch (err) {
        return next(err)
    }
}

// Get a clinician.
const getClinicianById = async (req, res, next) => {
    try {
        const clinician = await Clinician.findById(
            req.params.clinician_id
        ).lean()
        return res.send(clinician)
    } catch (err) {
        return next(err)
    }
}

// Get all the patients of a clinician.
const getAllPatientsOf = async (req, res, next) => {
    try {
        const clinician = await Clinician.findById(
            req.params.clinician_id
        ).lean()
        for (patient_id in clinician.patient_list) {
            const patient = await Patient.findById(patient_id).lean()
            res.send(patient)
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllClinicians,
    getClinicianById,
    getAllPatientsOf,
}

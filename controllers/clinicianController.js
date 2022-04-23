const Patient = require('../models/patients')
const Clinician = require('../models/clinicians')

const getClinicianById = async(req, res, next) => {
    try {
        const clinician = await Clinician.findById(req.params.clinician_id).lean()
        return res.send(clinician)
    } catch (err) {
        return next(err)
    }
}

const getAllPatients = async (req, res, next) => {
    try {
        const clinician = await Clinician.findById(req.params.clinician_id).lean()
        for (patient_id in clinician.patient_list) {
            const patient = await Patient.findById(patient_id).lean()
            res.send(patient)
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getClinicianById,
    getAllPatients
}
const Patient = require('../models/patients')
const Clinician = require('../models/clinicians')

// Get all patients.
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().lean()
    return res.send(patients)
  } catch (err) {
    return next(err)
  }
}

// Get a patient.
const getPatientById = async (req, res, next) => {
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

// Get the clinician assigned to a patient.
const getClinicianOf = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id).lean()
    const clinician = await Clinician.findById(patient.clinician_id).lean()
    return res.send(clinician)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getAllPatients,
  getPatientById,
  getClinicianOf,
}

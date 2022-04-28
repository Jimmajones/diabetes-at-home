const Patient = require('../models/patients')
const Clinician = require('../models/clinicians')

// Get all clinicians.
const getAllClinicians = async (req, res, next) => {
  try {
    const clinicians = await Clinician.find()
    return res.send(clinicians)
  } catch (err) {
    return next(err)
  }
}

// Get a clinician.
const getClinicianById = async (req, res, next) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id)
    return res.send(clinician)
  } catch (err) {
    return next(err)
  }
}

// Get all the patients of a clinician.
const getAllPatientsOf = async (req, res, next) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id)
    // Find all Patient document IDs listed for this Clinician.
    const data = await Patient.find({ _id: { $in: clinician.patient_list } })
    res.send(data)
  } catch (err) {
    return next(err)
  }
}

// get a patient
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id).lean()
    if (!patient) {
      return res.sendStatus(404)
    }
    res.send(patient)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getAllClinicians,
  getClinicianById,
  getAllPatientsOf,
  getPatientById,
}

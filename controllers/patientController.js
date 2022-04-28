const Patient = require('../models/patients')
// const Clinician = require('../models/clinicians')

// Get all patients.
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()
    return res.send(patients)
  } catch (err) {
    return next(err)
  }
}

const viewDashboard = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id, {
      first_name: true,
      required_data: true,
      daily_data: true
    })
    if (!patient) {
      return res.sendStatus(404)
    }
    res.render('patient-dashboard', { data: patient })
  } catch (err) {
    return next(err)
  }
}

const addHealthRecord = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id).lean()
    if (!patient) {
      return res.sendStatus(404)
    }
    
  } catch (err) {
    return next(err)
  }
}

// const recordData = async (req, res, next) => {
//   try {
//     const patient = await Patient.findById(req.params.patient_id).lean()
//     if (!patient) {
//       return res.sendStatus(404)
//     }
//     for (data in patient.daily_data) {
//       if (data.daily_data.date_recorded )
//     }
//   }
// }

module.exports = {
  getAllPatients,
  viewDashboard,
  addHealthRecord,
}

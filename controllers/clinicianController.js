const patientModel = require('../models/patients')
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

// Get all the patients of a clinician.
const viewAllPatients = async (req, res, next) => {
  try {
    // Hardcode the user (for now).
    let clinician = await Clinician.findOne({ first_name: 'Chris' })
    // Find all Patient document IDs listed for this Clinician.
    const data = await patientModel.Patient.find({ _id: { $in: clinician.patient_list } })
    res.send(data)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  //getAllClinicians,
  viewAllPatients,
}

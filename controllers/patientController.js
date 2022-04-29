const patientModel = require('../models/patients')

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
    // Hardcode the user (for now).
    const patient = await patientModel.Patient.findOne(
      { first_name: 'Pat' },
      {
        first_name: true,
        daily_data: true,
      }
    ).lean()
    res.render('patient-dashboard-simple', {
      layout: 'patient',
      name: patient.first_name,
      records: patient.daily_data,
    })
  } catch (err) {
    return next(err)
  }
}

const addHealthRecord = async (req, res, next) => {
  try {
    res.send('Not implemented yet. Sorry!')
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  //getAllPatients,
  viewDashboard,
  addHealthRecord,
}

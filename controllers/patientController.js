const Patient = require('../models/patients')

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
    const patient = await Patient.findOne(
      { first_name: 'Pat' },
      {
        first_name: true,
        daily_data: true,
      }
    ).lean()
    res.render('patient-dashboard', {
      layout: 'patient',
      patient: patient,
    })
  } catch (err) {
    return next(err)
  }
}

const addHealthRecord = async (req, res, next) => {
  try {
    let done = function (err, result) {
      res.send(result)
    }
    const patient = await Patient.findOne({ first_name: 'Pat' })
    const test_data = {
      values: [
        { type: 'blood', value: 4.4 },
        { type: 'weight', value: 69 },
      ],
    }
    Patient.updateOne(
      { _id: patient._id },
      { $push: { daily_data: test_data } },
      done
    )
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getAllPatients,
  viewDashboard,
  addHealthRecord,
}

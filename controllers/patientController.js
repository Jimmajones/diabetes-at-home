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
    const data = {
      values: [
        { type: 'blood', value: req.body.blood },
        { type: 'weight', value: req.body.weight },
        { type: 'insulin', value: req.body.insulin },
        { type: 'steps', value: req.body.steps },
      ],
    }
    Patient.updateOne(
      { _id: patient._id },
      { $push: { daily_data: data } },
      done
    )
  } catch (err) {
    return next(err)
  }
}

// Allow patients to update their records
const updateRecord = async (req, res, next) => { 
  try { 
    const patient = await Patient.findById(req.params.patient_id)
    if (!patient) { 
      return res.sendStatus(404)
    }
    const data = patient.daily_data[req.body.key]
    

    patient.save()
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
  UpdateRecord,
}

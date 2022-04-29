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

// Get all the patients of a clinician.
const viewAllPatients = async (req, res, next) => {
  try {
    // Hardcode the user (for now).
    const clinician = await Clinician.findOne({ first_name: 'Chris' })
    // Find all Patient document IDs listed for this Clinician.
    const patients = await Patient.find(
      {
        _id: { $in: clinician.patient_list },
      },
      { daily_data: { $slice: -1 } }
    ).lean()

    for (let i = 0; i < patients.length; i++) {
      var patient = patients[i]
      var isComplete = false
      var isWithinThreshold = false
      var statusString = ''

      // Check completion
      if (patient.daily_data[0].values.length == patient.thresholds.length) {
        isComplete = true
      }
      // Check thresholds
      for (data in patient.daily_data.values) {
        for (threshold in patient.thresholds) {
          if (data.type == data.type) {
            if (
              data.value >= threshold.lower &&
              data.value <= threshold.upper
            ) {
              isWithinThreshold = true
            }
          }
        }
      }

      if (isComplete && isWithinThreshold) {
        statusString = 'GOOD'
      } else if (isComplete && !isWithinThreshold) {
        statusString = 'OUTSIDE THRESHOLD'
      } else if (!isComplete && isWithinThreshold) {
        statusString = 'INCOMPLETE'
      } else {
        statusString = 'INCOMPLETE & OUTSIDE THRESHOLD'
      }

      Patient.updateOne(
        { _id: patient._id },
        { $set: { status: statusString } }
      )
    }

    res.render('clinician-dashboard', {
      layout: 'clinician',
      patients: patients,
    })
  } catch (err) {
    return next(err)
  }
}

// Get one specific patient
const getOnePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id).lean()
    if (patient) {
      res.send(patient)
    } else {
      res.send('patient not found')
    }
  } catch (err) {
    return next(err)
  }
}

// Add a new patient
const addOnePatient = async (req, res, next) => {
  try {
    const newPatient = req.body
    if (!Patient.find((d) => d.patient_id == newPatient.id)) {
      Patient.push(newPatient)
    }
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  //getAllClinicians,
  viewAllPatients,
  getOnePatient,
  addOnePatient,
}

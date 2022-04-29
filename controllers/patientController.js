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
        daily_data: { $slice: -3 },
      }
    ).lean()

    var notNull = 0
    for (obj in patient.daily_data[0].values) {
      if (obj.value != undefined) {
        notNull++
      }
    }

    await Patient.updateOne(
      { _id: patient._id },
      { $set: { completion_rate: notNull / 4 } }
    )

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
      res.redirect('back')
    }
    const patient = await Patient.findOne(
      { first_name: 'Pat' },
      {
        first_name: true,
        daily_data: { $slice: -1 },
      }
    )
    console.log(patient)
    // Find out if the latest health record was made today.
    const today = new Date()
    const record_date = patient.daily_data[0].when
    let is_same_day
    if (
      record_date.getDay() == today.getDay() &&
      record_date.getMonth() == today.getMonth() &&
      record_date.getYear() == today.getYear()
    ) {
      is_same_day = true
    } else {
      is_same_day = false
    }

    const data = {
      values: [
        {
          type: 'blood',
          value: req.body.blood,
          comment: req.body.blood_comment,
        },
        {
          type: 'weight',
          value: req.body.weight,
          comment: req.body.weight_comment,
        },
        {
          type: 'insulin',
          value: req.body.insulin,
          comment: req.body.insulin_comment,
        },
        {
          type: 'steps',
          value: req.body.steps,
          comment: req.body.steps_comment,
        },
      ],
    }

    // var notNull = 0
    // for (obj in data.values) {
    //   if (obj.value != null) {
    //     notNull++
    //   }
    // }
    if (is_same_day) {
      Patient.updateOne(
        { _id: patient._id },
        { $set: { $last: { daily_data: data } } },
        done
      )
    } else {
      Patient.updateOne(
        { _id: patient._id },
        { $push: { daily_data: data } },
        done
      )
    }
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
  updateRecord,
}

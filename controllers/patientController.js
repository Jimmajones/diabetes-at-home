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
    const patient = req.user.toJSON()
    /*
    var notNull = 0
    for (obj in patient.daily_data[0].values) {
      if (obj.value != undefined) {
        notNull++
      }
    }
    */

    await Patient.updateOne(
      { _id: patient._id },
      { $set: { completion_rate: 0.5 } }
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
    const patient = req.user
    // Find out if the latest health record was made today.
    const today = new Date()
    const record = patient.daily_data[0]

    let is_same_day
    if (!record) {
      is_same_day = false
    } else {
      record_date = record.when
      if (
        record_date.getDate() == today.getDate() &&
        record_date.getMonth() == today.getMonth() &&
        record_date.getFullYear() == today.getFullYear()
      ) {
        is_same_day = true
      } else {
        is_same_day = false
      }
    }

    // for (let requiredData of patient.thresholds) {

    // }

    console.log(req.body)
    const blood_data = {
      type: 'blood',
      value: req.body.blood,
      comment: req.body.blood_comment,
      //status: updateStatus(blood_data.value, patient.thresholds),
    }

    const weight_data = {
      type: 'weight',
      value: req.body.weight,
      comment: req.body.weight_comment,
      //status: updateStatus(weight_data.value, patient.thresholds),
    }

    const insulin_data = {
      type: 'insulin',
      value: req.body.insulin,
      comment: req.body.insulin_comment,
      //status: updateStatus(insulin_data.value, patient.thresholds),
    }

    const steps_data = {
      type: 'steps',
      value: req.body.steps,
      comment: req.body.steps_comment,
      //status: updateStatus(steps_data.value, patient.thresholds),
    }

    const data = { values: [blood_data, weight_data, insulin_data, steps_data] }

    if (is_same_day) {
      // Hard-coding like this is probably a bad practice. And also
      // probably indicative of how terrible of an idea it was for
      // me to make this an array of arrays. But whatever it works
      // holy moly this took forever.
      if (blood_data.value && !record.values[0].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.0': blood_data } }
        )
      }
      if (weight_data.value && !record.values[0].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.1': weight_data } }
        )
      }
      if (insulin_data.value && !record.values[0].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.2': insulin_data } }
        )
      }
      if (steps_data.value && !record.values[0].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.3': steps_data } }
        )
      }
      res.redirect('back')
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

// Returns a string representing the daily status of patient
const updateStatus = (value, thresholds) => {
  for (let required_data of thresholds) {
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

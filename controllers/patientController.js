const Patient = require('../models/patients')
// const Clinician = require('../models/clinicians')

function get_score(patient) {
  let today = new Date()
  let registered = patient.registered
  let difference_in_days = Math.ceil(
    (today.getTime() - registered.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (patient.daily_data.length > 0) {
    return patient.daily_data.length / difference_in_days
  } else {
    return 0
  }
}

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
    const patient = req.user.toJSON()
    patient.score_percent = Math.round(get_score(patient) * 100 * 100) / 100
    patient.is_over_80 = patient.score_percent >= 80
    res.render('patient-dashboard', {
      layout: 'patient',
      patient: patient,
      title: 'Dashboard',
      loggedin: req.isAuthenticated(),
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
    const record = patient.daily_data[patient.daily_data.length - 1]

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

    const blood_data = {
      type: 'blood_glucose',
      value: req.body.blood,
      comment: req.body.blood_comment,
      status: null,
    }

    const weight_data = {
      type: 'weight',
      value: req.body.weight,
      comment: req.body.weight_comment,
      status: null,
    }

    const insulin_data = {
      type: 'insulin',
      value: req.body.insulin,
      comment: req.body.insulin_comment,
      status: null,
    }

    const steps_data = {
      type: 'steps',
      value: req.body.steps,
      comment: req.body.steps_comment,
      status: null,
    }

    const list = { values: [blood_data, weight_data, insulin_data, steps_data] }

    for (let data of list.values) {
      // Find the matching threshold
      // If not found, status remains null because not required
      for (let threshold of patient.thresholds) {
        if (data.type == threshold.type) {
          if (!data.value) {
            data.status = 'incomplete'
          } else if (
            data.value < threshold.lower ||
            data.value > threshold.upper
          ) {
            data.status = 'outside-threshold'
          } else {
            data.status = 'good'
          }
          break
        }
      }
    }

    if (is_same_day) {
      // Update relevant values of the "same day" record by index.
      if (blood_data.value && !record.values[0].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.0': blood_data } }
        )
      }
      if (weight_data.value && !record.values[1].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.1': weight_data } }
        )
      }
      if (insulin_data.value && !record.values[2].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.2': insulin_data } }
        )
      }
      if (steps_data.value && !record.values[3].value) {
        await Patient.updateOne(
          { 'daily_data._id': record._id },
          { $set: { 'daily_data.$.values.3': steps_data } }
        )
      }
      res.redirect('back')
    } else {
      await Patient.updateOne(
        { _id: patient._id },
        { $push: { daily_data: list } }
      )
      res.redirect('back')
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

// Display patients sorted by their engagement rate
const viewLeaderboard = async (req, res, next) => {
  try {
    const patients = await Patient.find().lean()
    for (let i = 0; i < patients.length; i++) {
      patients[i].score = Math.round(get_score(patients[i]) * 100 * 100) / 100
    }

    // Sort patients by engagement rate
    patients.sort(function cmp(a, b) {
      if (a.score < b.score) {
        return 1 // If you want to reverse the order, just swap this...
      }
      if (a.score > b.score) {
        return -1 // ...with this.
      }
      return 0
    })
    res.render('leaderboard', {
      layout: 'patient',
      title: 'Leaderboard',
      patients: patients.slice(0, 5),
      loggedin: req.isAuthenticated(),
    })
  } catch (err) {
    return next(err)
  }
}

const viewSettings = async (req, res) => {
  try {
    const patient = req.user.toJSON()
    res.render('profile-setting', {
      layout: 'patient',
      title: 'Profile Setting',
      patient: patient,
      loggedin: req.isAuthenticated(),
    })
  } catch (err) {
    return next(err)
  }
}

const changeSettings = async (req, res, next) => {
  try {
    const patient = req.user
    if (req.body.password) {
      if (req.body.password == req.body.repassword) {
        patient.password = req.body.password
        await patient.save()
      } else {
        res.send('Ensure both passwords match')
        // return done(undefined, false, {
        //   message: 'Ensure both passwords match',
        // })
      }
    }

    await Patient.updateOne(
      { _id: patient._id },
      {
        $set: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          bio: req.body.bio,
          avatar_index: req.body.avatar,
        },
      }
    )

    res.redirect('back')
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getAllPatients,
  viewDashboard,
  addHealthRecord,
  updateRecord,
  viewLeaderboard,
  viewSettings,
  changeSettings,
}

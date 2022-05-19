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
    const clinician = req.user.toJSON()
    // Hardcode the user (for now).
    // const clinician = await Clinician.findOne({ first_name: 'Chris' }).lean()
    // Find all Patient document IDs listed for this Clinician.
    const patients = await Patient.find(
      {
        _id: { $in: clinician.patient_list },
      },
      { daily_data: { $slice: -1 } }
    ).lean()

    // Check for patients that have entered data for today
    const filledInPatients = patients.filter(
      (patient) => patient.daily_data.length > 0
    )

    res.render('clinician-dashboard', {
      layout: 'clinician',
      patients: filledInPatients,
      clinician: clinician,
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

const viewProfile = async (req, res, next) => {
  try {
    // Hardcode the user (for now).
    // const patient = await Patient.findOne({ first_name: 'Pat' }).lean()
    const clinician = req.user.toJSON()
    const patient = await Patient.findOne({
      username: req.params.username,
    }).lean()

    // Check if patient is in Clinician list of patients
    if (!patient || !patientInList(patient._id, clinician.patient_list)) {
      res.send('patient not found')
      // res.render('404', {
      //   layout: 'patient.hbs',
      //   title: 'Error 404'
      // })
    }

    res.render('patient-profile', {
      layout: 'clinician.hbs',
      title: 'Patient Profile',
      patient: patient,
    })
  } catch (err) {
    return next(err)
  }
}

// Update the support message of a patient
const supportMessage = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.patient_id).lean()
    if (!patient) {
      res.send('patient not found')
    } else {
      await Patient.updateOne(
        { _id: patient._id },
        { clinicians_message: req.body.supportMessage }
      )
      res.redirect('back')
    }
  } catch (err) {
    return next(err)
  }
}

const patientInList = (patient_id, patient_list) => {
  for (let id of patient_list) {
    if (id.equals(patient_id)) {
      return true
    }
  }
  return false
}

const viewRegister = async (req, res) => {
  res.render('register-patient', {
    layout: 'clinician.hbs',
    title: 'Register Patient',
  })
}

const profileSetting = async (req, res) => {
  // Hardcode the user (for now).
  const patient = await Patient.findOne({ first_name: 'Pat' }).lean()
  res.render('profile-setting', {
    layout: 'clinician.hbs',
    title: 'Profile Setting',
    patient: patient,
  })
}

const viewPatientComments = async (req, res) => {
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
    res.render('patient-comments', {
      layout: 'clinician.hbs',
      title: 'Patient Comments',
      patients: patients,
    })
  } catch (err) {
    return next(err)
  }
}

const setThresholds = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.body.patient_id).lean()
    let thresholds = []

    if (!patient) {
      res.send('patient not found')
    }

    if (req.body.bloodRequired) {
      thresholds.push({
        type: 'blood_glucose',
        lower: req.body.bloodMin,
        upper: req.body.bloodMax,
      })
    }
    if (req.body.weightRequired) {
      thresholds.push({
        type: 'weight',
        lower: req.body.weightMin,
        upper: req.body.weightMax,
      })
    }

    if (req.body.insulinRequired) {
      thresholds.push({
        type: 'insulin',
        lower: req.body.insulinMin,
        upper: req.body.insulinMax,
      })
    }

    if (req.body.stepsRequired) {
      thresholds.push({
        type: 'steps',
        lower: req.body.stepsMin,
        upper: req.body.stepsMax,
      })
    }
    await Patient.updateOne(
      { _id: patient._id },
      { $set: { thresholds: thresholds } }
    )
    res.redirect('back')
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  //getAllClinicians,
  viewAllPatients,
  getOnePatient,
  addOnePatient,
  viewRegister,
  viewProfile,
  profileSetting,
  viewPatientComments,
  setThresholds,
  supportMessage,
}

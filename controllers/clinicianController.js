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
    const clinician = await Clinician.findOne({ first_name: 'Chris' }).lean()
    // Find all Patient document IDs listed for this Clinician.
    const patients = await Patient.find(
      {
        _id: { $in: clinician.patient_list },
      },
      { daily_data: { $slice: -1 } }
    ).lean()
    res.render('clinician-dashboard', {
      layout: 'clinician',
      patients: patients,
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

const viewRegister = async (req, res) => {
  res.render('register-patient', {
    layout: 'clinician.hbs',
    title: 'Register Patient',
  })
}

const viewProfile = async (req, res) => {
  res.render('patient-profile', {
    layout: 'clinician.hbs',
    title: 'Patient Profile',
  })
}

const profileSetting = async (req, res) => {
  res.render('profile-setting', {
    layout: 'clinician.hbs',
    title: 'Profile Setting',
  })
}

const viewPatientComments = async (req, res) => {
  res.render('patient-comments', {
    layout: 'clinician.hbs',
    title: 'Patient Comments',
  })
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
}

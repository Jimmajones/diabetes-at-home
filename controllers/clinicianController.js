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
    /*
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
    
    for (var i = 0; i < patients.length; i++) {
      const patient = patients[i];
      var isComplete = true;
      var isWithinThreshold = true;
      var statusString = '';
      var data = patients[i].daily_data;

      // Check completion and thresholds
      for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].value == null) {
          data.values[i].warning = 'incomplete';
          isComplete = false;
        } else {
          for (var j = 0; j < patient.thresholds.length; j++) {
            if (data.values[i].type == patient.thresholds[j].type) {
              if ((data.values[i].value < patient.thresholds[j].lower) || (data.values[i].value > patient.thresholds[j].upper)) {
                warning = 'over-threshold';
                isWithinThreshold = false;
              }
            }
          }
        }
      }

      if (isComplete && isWithinThreshold) {
<<<<<<< HEAD
        statusString = 'GOOD'
      } else if (isComplete && !isWithinThreshold) {
        statusString = 'OUTSIDE THRESHOLD'
=======
        statusString = 'good';
      } else if (isComplete && !isWithinThreshold) {
        statusString = 'over-threshold';
>>>>>>> c21dcc8 (Old changes)
      } else if (!isComplete && isWithinThreshold) {
        statusString = 'incomplete'
      } else {
<<<<<<< HEAD
        statusString = 'INCOMPLETE & OUTSIDE THRESHOLD'
=======
        statusString = 'both';
>>>>>>> c21dcc8 (Old changes)
      }

      Patient.updateOne(
        { _id: patient._id },
        { $set: { status: statusString } }
      )
    }
    */

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

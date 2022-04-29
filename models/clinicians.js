const mongoose = require('mongoose')

// Needed for recording required_data.displayText
const displayText = {
  blood_glucose_level:
    "Blood Glucose Level (nmo/L)",
  weight:
    "Weight (kg)",
  insulin_doses:
    "Insulin (doses)",
  exercise_steps:
    "Exercise (steps)"
}

// Define schema with data types
const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  patient_list: [{ type: mongoose.Types.ObjectId, ref: 'Patient' }],
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician

const mongoose = require('mongoose')

// Needed for recording required_data.displayText
const displayText = {
  blood_glucose_level: 'Blood Glucose Level (nmo/L)',
  weight: 'Weight (kg)',
  insulin_doses: 'Insulin (doses)',
  exercise_steps: 'Exercise (steps)',
}

// Define schema with data types
const schema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  screen_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  bio: String,
  patient_list: [{ type: mongoose.Types.ObjectId }],
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician

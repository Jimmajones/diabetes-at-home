const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Needed for recording required_data.displayText
const displayText = {
  blood_glucose_level: 'Blood Glucose Level (nmo/L)',
  weight: 'Weight (kg)',
  insulin_doses: 'Insulin (doses)',
  exercise_steps: 'Exercise (steps)',
}

// Define schema with data types
const clinicianSchema = new mongoose.Schema({
  role: { type: String },
  first_name: String,
  last_name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  patient_list: [{ type: mongoose.Types.ObjectId, ref: 'Patient' }],
})

const Clinician = mongoose.model('Clinician', clinicianSchema)
module.exports = Clinician

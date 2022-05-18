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

// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects
clinicianSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid)
  })
}

// Password salt factor
const SALT_FACTOR = 10

// Hash password before saving
clinicianSchema.pre('save', function save(next) {
  const user = this
  // Go to next if password field has not been modified
  if (!user.isModified('password')) {
    return next()
  }

  // Automatically generate salt, and calculate hash
  bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
    if (err) {
      return next(err)
    }
    // Replace password with hash
    user.password = hash
    next()
  })
})

const Clinician = mongoose.model('Clinician', clinicianSchema)
module.exports = Clinician

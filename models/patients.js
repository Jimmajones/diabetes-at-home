const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Possible "type" values are: 'blood', 'weight', 'insulin' and 'steps'.
// Probably want to change this to somehow use an enum in the future.

const thresholdSchema = new mongoose.Schema({
  type: String,
  lower: Number,
  upper: Number,
})

const valueSchema = new mongoose.Schema({
  type: String,
  value: Number,
  comment: String,
  status: String,
  when: { type: Date, default: Date.now },
})

const recordSchema = new mongoose.Schema({
  values: [valueSchema],
  when: { type: Date, default: Date.now },
})

const noteSchema = new mongoose.Schema({
  note: String,
  when: { type: Date, default: Date.now }
})

const patientSchema = new mongoose.Schema({
  role: { type: String, required: true },
  first_name: String,
  last_name: String,
  thresholds: [thresholdSchema],
  daily_data: [recordSchema],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  post_code: Number,
  bio: { type: String, required: true },
  engagement_score: Number,
  leaderboard_rank: Number,
  completion_rate: Number,
  clinicians_message: String,
  clinical_notes: [noteSchema],
  avatar_index: Number
})

// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects
patientSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid)
  })
}

// Password salt factor
const SALT_FACTOR = 10

// Hash password before saving
patientSchema.pre('save', function save(next) {
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

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient

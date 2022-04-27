const mongoose = require('mongoose')

// Define schema with data types
const schema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  screen_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  post_code: Number,
  bio: { type: String, required: true },
  engagement_score: Number,
  leaderboard_rank: Number,
  clinician_id: { type: mongoose.Types.ObjectId, required: true },
  required_data: [
    {
      data_type: {
        type: String,
        enum: [
          'blood_glucose_level',
          'weight',
          'insulin_doses',
          'exercise_steps',
        ],
      },
      lower_bound: Number,
      upper_bound: Number,
    },
  ],
  daily_data: [
    {
      blood_glucose_level: {
        value: Number,
        comment: String,
        time: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      weight: {
        value: Number,
        comment: String,
        time: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      insulin_doses: {
        value: Number,
        comment: String,
        time: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      exercise_steps: {
        value: Number,
        comment: String,
        time: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      date_recorded: Date,
    },
  ],
})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient

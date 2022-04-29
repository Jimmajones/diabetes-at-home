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

  // Array of all data required by patient
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
      display_text: String,
      completed: { type: Boolean, default: false },
      lower_bound: Number,
      upper_bound: Number,
    },
  ],

  // Record of today's data, starts off empty and null
  daily_data: {
    blood_glucose_level: {
      value: Number,
      comment: String,
      time_recorded: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    weight: {
      value: Number,
      comment: String,
      time_recorded: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    insulin_doses: {
      value: Number,
      comment: String,
      time_recorded: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    exercise_steps: {
      value: Number,
      comment: String,
      time_recorded: { type: Date, default: Date.now },
      within_threshold: Boolean,
    },
    status: {
      type: String,
      enum: [
        'GOOD',
        'INCOMPLETE',
        'OUTSIDE THRESHOLD',
        'INCOMPLETE & OUTSIDE THRESHOLD',
      ],
    },
    warning_text: String,
    completion_rate: { type: Number, default: 0 },
    date_recorded: String,
  },

  // Daily record of data before daily_data
  daily_data_history: [[
    {
      blood_glucose_level: {
        value: Number,
        comment: String,
        time_recorded: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      weight: {
        value: Number,
        comment: String,
        time_recorded: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      insulin_doses: {
        value: Number,
        comment: String,
        time_recorded: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      exercise_steps: {
        value: Number,
        comment: String,
        time_recorded: { type: Date, default: Date.now },
        within_threshold: Boolean,
      },
      status: {
        type: String,
        enum: [
          'GOOD',
          'INCOMPLETE',
          'OUTSIDE THRESHOLD',
          'INCOMPLETE & OUTSIDE THRESHOLD',
        ],
      },
      warning_text: String,
      completion_rate: { type: Number, default: 0 },
      date_recorded: String,
    },
  ]],
})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient

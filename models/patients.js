const mongoose = require('mongoose')

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
  when: { type: Date, default: Date.now },
})

const recordSchema = new mongoose.Schema({
  values: [valueSchema],
})

const patientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  //thresholds: [thresholdSchema],
  daily_data: [recordSchema],
})

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient

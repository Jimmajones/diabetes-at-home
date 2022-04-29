const mongoose = require('mongoose')

const valueSchema = new mongoose.Schema({
  type: String,
  enum: ['blood', 'weight', 'insulin', 'steps'],
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
  daily_data: [recordSchema],
})

const Value = mongoose.model('Value', valueSchema)
const Record = mongoose.model('Record', recordSchema)
const Patient = mongoose.model('Patient', patientSchema)
module.exports = { Value, Record, Patient }

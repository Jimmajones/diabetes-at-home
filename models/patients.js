const mongoose = require('mongoose')

const bloodSchema = new mongoose.Schema({
  value: Number,
  comment: String,
  when: { type: Date, default: Date.now },
})

const recordSchema = new mongoose.Schema({
  blood: bloodSchema,
})

const patientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  daily_data: [recordSchema],
})

const Blood = mongoose.model('Blood', bloodSchema)
const Record = mongoose.model('Record', recordSchema)
const Patient = mongoose.model('Patient', patientSchema)
module.exports = { Blood, Record, Patient }

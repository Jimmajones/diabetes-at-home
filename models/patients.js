const mongoose = require('mongoose')

const thresholdSchema = new mongoose.Schema({
	type: String,
	enum: ['blood', 'weight', 'insulin', 'steps'],
	lower: Number,
	upper: Number,
	
})

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
  thresholds: [thresholdSchema],
  daily_data: [recordSchema],
})


const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient

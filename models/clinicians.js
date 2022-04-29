const mongoose = require('mongoose')

// Define schema with data types
const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  patient_list: [{ type: mongoose.Types.ObjectId }],
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician

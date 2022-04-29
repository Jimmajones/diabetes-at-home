const mongoose = require('mongoose')

// Define schema with data types
const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  daily_data: [
    {
      blood_glucose_level: {
        value: Number,
        comment: String,
        time: Date,
      },
    },
  ],
})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient

const mongoose = require('mongoose')

// Define schema with data types
const schema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    screen_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date_of_birth: {type: Date, required: true},
    bio: String,
    patient_list: [{type: mongoose.Types.ObjectId}]
})

const Clinician = mongoose.model('Clinician', schema)
module.exports = Clinician
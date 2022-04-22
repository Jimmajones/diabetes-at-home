const mongoose = require('mongoose')

// Define schema with data types
const schema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    screen_name: String,
    date_of_birth: Date,
    post_code: Number,
    bio: String,
    engagement_score: Number,
    leaderboard_rank: Number,
    clinician_id: {type: mongoose.Types.ObjectId, required: true},
    daily_data: [{
        blood_glucose: Number,
        weight: Number,
        insulin_doses: Number,
        exercise_steps: Number,
        date_recorded: Date
    }]
})

const Patient = mongoose.model('Patient', schema)
module.exports = Patient
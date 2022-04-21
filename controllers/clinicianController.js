const clinicianData = require('../models/clinicianModel')

const getAllData = (req, res) => {
    res.send(clinicianData)
}

module.exports = {
    getAllData,
}

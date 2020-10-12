const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema)
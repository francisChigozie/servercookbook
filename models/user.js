const mongoose = require('mongoose')

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    date:{
        type: Date,
        default:Date.now
    }

})
module.exports = mongoose.model('user', User)
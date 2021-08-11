const mongoose = require('mongoose')

const Exercise = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    }

})
module.exports = mongoose.model('exercise', Exercise)
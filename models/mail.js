const mongoose = require('mongoose')

const Mail = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    txtArea:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    }

})
module.exports = mongoose.model('mail', Mail)
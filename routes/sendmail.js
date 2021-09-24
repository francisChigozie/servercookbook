var nodemailer = require('nodemailer');

require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cyriacus1210@gmail.com',
    pass: process.env.NODEMAILER_PASSWORD
  }
});

function sendmail(email){

    var mailOptions = {
        from: 'cyriacus1210@gmail.com',
        to: email,
        subject: 'Complete your Gospel Forum Appointment',
        html: "<h3>Please click on the link below to complete the process:</h3><br>" +
    "</a><br><a href='https://cookbook-qrcode.herokuapp.com'>Generate your QR-Code here</a><br><br>" +
        "From the Management:<br>Franksoft Inc GmbH<br>74074 - Heilbronn<br>Germany"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendmail;

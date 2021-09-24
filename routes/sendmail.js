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
        subject: 'Thank You For Visiting My Portfolio',
        html: "<h3>Please click on the link below  to my Github:</h3><br>" +
    "</a><br><a href='https://github.com/francisChigozie'>For more details</a><br><br>" +
        "Freelancer Management:<br>Fit Security<br>Germany"
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

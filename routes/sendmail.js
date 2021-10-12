var nodemailer = require('nodemailer');

require('dotenv').config();

var transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
     port: 587,
     secure: false,
     auth: {
         user: 'cyriacus1210@gmail.com',
         pass: '1MEYrXzsO6ngTH7R'
  },
  tls:{
      rejectUnauthorized: false
  }
});

 async function  sendmail(email){

    var mailOptions = {
        from: 'cyriacus1210@gmail.com',
        to: email,
        subject: 'Thank You For Visiting My Portfolio',
        text: "<h3>Please click on the link below  to my Github:</h3><br>" +
    "</a><br><a href='https://github.com/francisChigozie'>For more details</a><br><br>" +
        "Freelancer Management:<br>Fit Security<br>Germany"
    };

     await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendmail;

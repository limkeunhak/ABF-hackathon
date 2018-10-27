const nodemailer = require('nodemailer');
const mailSender = {};

mailSender.sendMail = (to, subject, text, callback) => {    
    const transforter = nodemailer.createTransport({  
        service: 'Gmail',
        auth: {
            user: 'mungmungtest@gmail.com',
            pass: 'mung123!@#'
        }
    });
    
    const mailOptions = {  
        from: 'mungmungtest@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transforter.sendMail(mailOptions, function(error, response){
        callback(error, response);
        if (error){
            console.log(error);
        } else {
            console.log("Message sent");
        }
        transforter.close();
    });    
}

module.exports = mailSender;
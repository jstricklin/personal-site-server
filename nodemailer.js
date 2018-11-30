const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const sendMail = (data) => {
    console.log('mailing...?', data)
    // create test account below for testing
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        // set up email data below
        let mailOptions = {
            from: "'Portfolio Site Contact' <jose@jstricklin.com>", //sender
            to: process.env.MY_ADDY, //list receivers
            subject: `Personal Site: ${data.name} contacted you!`,
            text: `${data.message} -- ${data.email}`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
            console.log('Message sent: %s', info.messageId)
            //preview below if using ethereal email
            console.log('Preview url: %s', nodemailer.getTestMessageURL(info))
        })
    })
}

module.exports = {
    sendMail
};

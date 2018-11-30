const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const sendMail = (data) => {
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
            from: `Personal Site: ${data.name},  <${data.email}>`, //sender
            to: process.env.MY_ADDY, //list receivers
            subject: `Personal Site: ${data.name} contacted you!`,
            text: `${data.message} -- ${data.email}`
        }
        let ccOptions = {
            from: `Jose Stricklin, <${process.env.MY_ADDY}>`, //sender
            to: data.email, //list receivers
            subject: 'Thanks for reaching out!',
            text: `Hey ${data.name},

            I will get back to you as soon as I can - thank you again for reaching out!

                - Jose Stricklin`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            }
            console.log('Message sent: %s', info.messageId)
            //preview below if using ethereal email
            console.log('Preview url: %s', nodemailer.getTestMessageURL(info))
        })
        transporter.sendMail(ccOptions, (error, info) => {
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

const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const sendMail = (params) => {
    console.log('mailing...?')
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
    })
}

module.exports = {
    sendMail
};

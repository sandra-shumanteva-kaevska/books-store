import nodemailer from 'nodemailer'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTPuserName,
        pass: process.env.SMTPpassword
    }
})

export const Mailer = (email, firstName, lastName) => {


    var mailOptions = {
        to: email,
        subject: 'Sending Order confirmation',
        text: `Thank you ${firstName} ${lastName} for your order. You have successfully ordered from Book Store`
    }

    transporter.sendMail(mailOptions)
}
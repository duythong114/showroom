require('dotenv').config
import nodemailer from 'nodemailer'

const sendBookingEmail = async (dataEmail) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"LuxuryCar" <luxurycar@gmail.com>', // sender address
        to: dataEmail?.email, // list of receivers
        subject: `Booking to see the car: ${dataEmail?.carName}`, // Subject line
        // text: "Hello world?", // plain text body
        html: `
            <p><b> Dear  ${dataEmail?.firstName}</b><p/>
            <p>
            You are receiving this email because you have scheduled a <b>${dataEmail?.carName}</b> car 
            viewing appointment at a luxurycar store
            <p/>
            <p><b>Time: ${dataEmail?.time}</b></p>
            <p><b>Thank you</b></p>
        `, // html body
    });
}

const sendNewPasswordEmail = async (email, randomPassword) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"LuxuryCar" <luxurycar@gmail.com>', // sender address
        to: email, // list of receivers
        subject: `Get new password`, // Subject line
        // text: "Hello world?", // plain text body
        html: `
            <p><b>New password: ${randomPassword}</b><p/>
        `, // html body
    });
}

module.exports = {
    sendBookingEmail: sendBookingEmail,
    sendNewPasswordEmail: sendNewPasswordEmail,
}
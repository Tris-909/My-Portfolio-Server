const express = require('express')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();

// Env Variables
const ENV = process.env.ENV;
const MY_GMAIL = process.env.MY_GMAIL;
const MY_GMAIL_PASSWORD = process.env.MY_GMAIL_PASSWORD;
const LOCAL_URL = process.env.LOCAL_URL;
const PROD_URL = process.env.PROD_URL;

const app = express()
const port =  ENV === 'dev' ? LOCAL_URL : PROD_URL;

app.post('/sendMessage', (req, res) => {
    const { email, message } = req.query;

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: MY_GMAIL,
          pass: MY_GMAIL_PASSWORD
        }
    }));

    const mailOptions = {
        from: email,
        to: MY_GMAIL,
        subject: `A Message from ${email} (My Portfolio)`,
        text: `
        Email: ${email}

        Message: ${message}
        `
    };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    res.status(200).send('Send email successfully');
});

app.listen(port, () => {
  console.log(`Example app listening at${port}`)
})
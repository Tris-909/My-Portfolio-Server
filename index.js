const express = require('express')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors');
require('dotenv').config();

// Env Variables
const PORT = process.env.PORT;
const MY_GMAIL = process.env.MY_GMAIL;
const MY_GMAIL_PASSWORD = process.env.MY_GMAIL_PASSWORD;

const app = express()
const port =  PORT || 5000;

app.use(cors());

app.post('/sendMessage', (req, res) => {
    const { name, email, message } = req.query;

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

        Name: ${name}

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
  console.log(`Example app listening at ${port}`)
})
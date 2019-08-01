const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

app.post("", (req, res) => {
    const {
        name,
        company,
        email,
        phone,
        message
    } = req.body;
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${name}</li>
        <li>Company: ${company}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        auth: {
            user: "", // generated ethereal user
            pass: "" // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <this0924@email.com>', // sender address
        to: "this0924@gmail.com", // list of receivers
        subject: "Node Contact Request", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
});

module.exports = router;
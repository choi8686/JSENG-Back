const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("", (req, res) => {
    const {
        name,
        company,
        email,
        phone,
        fax,
        product,
        title,
        message

    } = req.body;
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>이름: ${name}</li>
        <li>회사: ${company}</li>
        <li>이메일: ${email}</li>
        <li>연락처: ${phone}</li>
        <li>팩스: ${fax}</li>
        <li>상담제품: ${product}</li>
        <li>제목: ${title}</li>
      </ul>
      <h3>Message</h3>
      <p>${message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 8000,
        secure: false,
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
        to: "jseng@naver.com", // list of receivers
        subject: "새로운 견적문의입니다", // Subject line
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
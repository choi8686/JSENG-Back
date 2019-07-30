const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'naver',
    auth: {
        user: 'chs8686@naver.com',
        pass: 'this0924'

    }

});

module.exports = router;
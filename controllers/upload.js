const express = require("express");
const router = express.Router();
const models = require("../models");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new AWS.S3();
const path = require("path");

const upload = multer({
    storage: multerS3({
        s3: s3,

        bucket: "jseng-image/newproduct", //aws s3에 만든 버킷 이름
        acl: "public-read", //s3 권한
        metadata(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function (req, file, cb) {


            cb(null, Date.now().toString());
        }
    })
});


router.post('', upload.single('photo'), async (req, res, next) => {
    const photoUrl = req.file.location;

    try {
        const upload = models.newProduct.create({
            photoUrl: photoUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.status(200).json({
            upload
        });

    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});


module.exports = router;
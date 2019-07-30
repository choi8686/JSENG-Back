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

        bucket: "jseng-image/notice", //aws s3에 만든 버킷 이름
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

router.post("", upload.single("file"), (req, res) => {
    var upload = models.attachNotice.create({
        fileUrl: fileUrl,
        noticeId: noticeId,
        createdAt: Date(),
        updatedAt: Date()
    })
    res.send("Successfully uploaded " + req.file.length + " files!")
        .catch(error => {
            console.log(error);
        });

});

// router.get("/:teamId", async (req, res) => {
//     let id = req.params.teamId;
//     models.Teamimage.findAll({
//             include: [{
//                 model: models.Team,
//                 where: {
//                     id: id
//                 }
//             }]
//         })
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// });

module.exports = router;
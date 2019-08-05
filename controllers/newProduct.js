const express = require("express");
const router = express.Router();
const models = require("../models");
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new AWS.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,

        bucket: "jseng-image/newProduct", //aws s3에 만든 버킷 이름
        contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
        acl: "public-read", //s3 권한
        key: function (req, file, cb) {
            console.log(file)
            cb(null, file.originalname);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


router.post('/post/img', upload.single('img'), (req, res) => {
    try {
        console.log("req.file: ", req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음 

        let payLoad = {
            url: req.file.location
        };
        response(res, 200, payLoad);
    } catch (err) {
        console.log(err);
        response(res, 500, "서버 에러")
    }
});

router.get('', async (req, res, next) => {
    try {
        const getImage = models.newProduct.findAll({

        })
        res.status(200).json({
            getImage
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.get('/:id', async (req, res) => {

    try {

        const getImageId = await models.newProduct.findOne({
            where: {
                id: req.params.id
            }

        })
        res.status(200).json({
            getImageId
        })
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

module.exports = router;
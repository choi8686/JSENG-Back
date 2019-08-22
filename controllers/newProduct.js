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


router.post('', upload.single('img'), async (req, res) => {
    const photoUrl = req.file.location;
    const title = req.body.title
    try {
        console.log("req.file: ", req.file);

        const imgUpload = await models.newProduct.create({
            title: title,
            photoUrl: photoUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.status(200).json({
            imgUpload
        });

    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

router.get("", async (req, res, next) => {
    const {
        _start,
        _end
    } = req.query;
    try {
        const getImage = await models.newProduct.findAll({
            order: [
                ["id", "DESC"] //id 역순으로 정렬
            ]
        });
        const resultPagination = {
            page: getImage.slice(_start, _end),
            total: getImage.length
        };
        res.status(200).json({
            resultPagination
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

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

router.put('/:id', upload.single('img'), async (req, res) => {
    let photoUrl;
    const {
        title,
        baseUrl
    } = req.body


    // 사진타이틀만 수정하는 case로 인한 로직추가
    // 새로운 사진요청이 들어오면 ? 새로운 사진의 경로를 photoUrl로 지정 : 그게 아니면 기존 baseUrl 유지
    if (await req.file) {
        fileUrl = req.file.location
    } else {
        fileUrl = baseUrl
    }

    try {
        const changeImg = await models.newProduct.update({
            title: title,
            photoUrl: photoUrl
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            changeImg
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await models.newProduct.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(req.params.id)
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }

})

module.exports = router;
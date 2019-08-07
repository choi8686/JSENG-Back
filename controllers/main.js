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




router.get("/notice", async (req, res, next) => {
    const {
        _start,
        _end
    } = req.query;
    try {
        const result = await models.Notice.findAll({
            order: [
                ["id", "DESC"]
            ]
        });
        const resultPagination = {
            page: result.slice(_start, _end),
            total: result.length
        };
        res.status(200).json({
            resultPagination
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});


router.post('/notice', upload.single('file'), async (req, res, next) => {
    const fileUrl = req.file.location;
    const {
        title,
        contents
    } = req.body;
    try {
        if (fileUrl === undefined) {
            const createWithOutFileUrl = await models.Notice.create({
                title: title,
                contents: contents,
                fileUrl: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }

        const createPost = await models.Notice.create({
            title: title,
            contents: contents,
            fileUrl: fileUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.status(200).json({
            createPost
        });

    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

router.get('/notice/:id', async (req, res) => {

    try {

        const getPostId = await models.Notice.findOne({
            where: {
                id: req.params.id
            }

        })
        res.status(200).json({
            getPostId
        })
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.put('/notice/:id', async (req, res) => { //update
    const fileUrl = req.file.location;
    const {
        title,
        contents
    } = req.body
    try {

        const changePost = await models.Notice.update({
            title: title,
            contents: contents,
            fileUrl: fileUrl
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send({
            changePost
        })
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

router.delete('/notice/:id', async (req, res) => {
    try {
        await models.Notice.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/notice')
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }

})
module.exports = router;
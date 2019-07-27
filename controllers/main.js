var express = require('express');
var router = express.Router();
var models = require("../models");
var cors = require('cors');
router.use(cors());




router.get('/notice', async (req, res, next) => {
    try {
        const result = await models.Notice.findAll({
            order: [
                ['updatedAt', 'DESC']
            ]

        })
        res.status(200).json({
            result
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});


router.post('/notice', async (req, res, next) => {
    const {
        title,
        contents
    } = req.body;
    try {
        const createPost = models.Notice.create({
            title: title,
            contents: contents,
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
            id: req.params.id

        })
        res.status(200).json({
            getPostId
        })
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
})

module.exports = router;
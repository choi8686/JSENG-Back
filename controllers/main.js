var express = require('express');
var router = express.Router();
var models = require("../models");
var cors = require('cors');
router.use(cors());




router.get('/notice', async (req, res, next) => {
    try {
        const result = await models.Notice.findAll({
            limit: 10,
            order: '"updatedAt" DESC'
        })
        res.status(200).json({
            result
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});


router.post('/notice/post', async (req, res, next) => {
    const {
        title,
        contents
    } = req.body;
    try {
        const createPost = models.Notice.create({
            title: title,
            contents: contents,
            attach: attach,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.status(200).json({
            createPost
        });
        res.redirect('/notice')
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

module.exports = router;
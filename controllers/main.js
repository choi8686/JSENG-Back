var express = require('express');
var router = express.Router();
var models = require("../models");





router.get('/notice', async (req, res, next) => {
    try {
        const result = await models.Notice.findAll({
            include: [{
                model: models.attachNotice,
                attributes: ["fileUrl"]
            }],
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
        const createPost = await models.Notice.create({
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

router.put('/notice/:id', async (req, res) => {
    const {
        title,
        contents
    } = req.body
    try {

        const changePost = await models.Notice.update({
            title: title,
            contents: contents
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
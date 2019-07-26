var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/notice', (req, res, next) => {
    res.redirect('/notice/1');
});

router.get('/notice/:page', async (req, res, next) => {
    try {
        await models.Notice.findAll({

        })
        res.render('show')
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

router.post('/notice', (req, res, next) => {
    let body = req.body;

    models.Notice.create({
            title: body.inputTitle,
            author: body.inputWriter
        })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
            console.log("데이터 추가 완료");
            res.redirect("/main/notice");
        })
        .catch(err => {
            console.log(res)
            console.log("데이터 추가 실패");
        })
});

module.exports = router;


const express = require("express");
const router = express.Router();
const models = require("../models");



router.post('/login', async (req, res, next) => {
    if (req.body.email && req.body.password) {
        const result = await models.User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        });
        if (result) {
            res.send(result);
        } else {
            res.send(false);
        }
    } else {
        console.log(res)
        res.sendStatus(400);
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();
const models = require("../models");


// router.post('/login', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local', (authError, user) => {
//         if (authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         if (!user) {
//             console.log('꺼져 새끼야')
//             return res.redirect('/');
//         }
//         return req.login(user, (loginError) => {
//             if (loginError) {
//                 console.error(loginError);
//                 return next(loginError)
//             }
//             console.log('환영한다 새끼야')
//             return res.redirect('/')
//         });
//     })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next) 첨부
// })

router.post("/login", async (req, res, next) => {
    if (req.query.email && req.query.password) {
        const result = await models.User.findOne({

            where: {
                email: req.query.email,
                password: req.query.password,
            }
        });
        if (result) {

            res.status(200).json(result) // ok
        } else {
            res.send(false);
        }
    } else {
        console.log(res)
        res.sendStatus(400);
    }
});

router.get('/list', (req, res) => {
    models.User.findAll({

        }).then(result => {
            if (result) {
                res.status(200).json(result) // ok
            }
        })
        .catch(error => {
            res.status(500).send(error) //Server Error
        })
})
module.exports = router;
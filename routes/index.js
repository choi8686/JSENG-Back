var express = require('express');
var router = express.Router();

const authRouter = require("../controllers/auth");
const mainRouter = require("../controllers/main");
const inqueryRouter = require("../controllers/inquery")
const newProductRouter = require("../controllers/newProduct")
/* GET home page. */
router.use("/auth", authRouter);
router.use("/main", mainRouter);
router.use("/support", inqueryRouter);
router.use("/newProduct", newProductRouter);

module.exports = router;
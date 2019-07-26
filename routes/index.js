var express = require('express');
var router = express.Router();

const authRouter = require("../controllers/auth");
const mainRouter = require("../controllers/main");
/* GET home page. */
router.use("/auth", authRouter);
router.use("/main", mainRouter);

module.exports = router;
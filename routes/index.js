var express = require('express');
var router = express.Router();

const authRouter = require("../controllers/auth");
/* GET home page. */
router.use("/auth", authRouter);

module.exports = router;
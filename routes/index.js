var express = require('express');
var router = express.Router();

const authRouter = require("../controllers/auth");
const mainRouter = require("../controllers/main");
const fileUploadRouter = require("../controllers/upload")
/* GET home page. */
router.use("/auth", authRouter);
router.use("/main", mainRouter);
router.use("/upload", fileUploadRouter)
module.exports = router;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require("./models").sequelize;
var indexRouter = require('./routes/index');
var models = require("./models");



var app = express();
sequelize.sync(); //sequelize 연결

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var passport = require("passport");


app.use("/", indexRouter);


module.exports = app;
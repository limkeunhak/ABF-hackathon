"use strict"

var express = require('express');
var passport = require('passport'); 
var router = express.Router();
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', userController.loginPage);
router.get('/logout', userController.logout);
router.get('/userinfo', userController.userInfo);
router.get('/signup', userController.signUpPage);

router.post('/login', userController.login);
router.post('/userinfo', userController.getUserInfo);
router.post('/signup', userController.signUp);

module.exports = router;

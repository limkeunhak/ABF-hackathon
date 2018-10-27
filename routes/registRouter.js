"use strict"

var express = require('express');
const registController = require('../controllers/registController');
var router = express.Router();

/* GET home page. */
router.get('/', registController.main);
router.get('/page1', registController.page1);
router.get('/pet', registController.registPetPage);
router.get('/thanks', registController.registThanksPage);

module.exports = router;

"use strict"

var express = require('express');
const sellingController = require('../controllers/sellingController');
var router = express.Router();

/* GET home page. */
router.get('/', sellingController.main);
router.get('/page1', sellingController.page1);
router.get('/page2', sellingController.page2);

module.exports = router;

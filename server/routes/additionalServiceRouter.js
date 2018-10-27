"use strict"

const express = require('express');
const additionalServiceController = require('../controllers/additionalServiceController');
const router = express.Router();

/* GET home page. */
router.get('/', additionalServiceController.main);
router.get('/page1', additionalServiceController.page1);
router.get('/page2', additionalServiceController.page2);

module.exports = router;

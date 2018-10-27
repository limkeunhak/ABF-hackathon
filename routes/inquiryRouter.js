"use strict"

const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const router = express.Router();

/* GET home page. */
router.get('/', inquiryController.main);
router.get('/page1', inquiryController.page1);
router.get('/page2', inquiryController.page2);

module.exports = router;

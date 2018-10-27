"use strict"

const express = require('express');
const router = express.Router();
const introController = require('../controllers/introController');

/* GET home page. */
router.get('/', introController.main);
router.get('/page1', introController.page1);
router.get('/page2', introController.page2);

module.exports = router;

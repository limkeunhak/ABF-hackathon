"use strict"

var express = require('express');
const registController = require('../controllers/registController');
var router = express.Router();

/* GET home page. */
router.get('/', registController.main);
router.get('/page1', registController.page1);
router.get('/pet', registController.registPetPage);
router.get('/dna', registController.registDnaPage);
router.get('/thanks', registController.registThanksPage);
router.get('/agencylist', registController.getAgencyList);

router.post('/dna', registController.registDna);

module.exports = router;

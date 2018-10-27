"use strict"

var express = require('express');
const companyController = require('../controllers/companyController');
var router = express.Router();

/* GET home page. */
router.get('/intro', companyController.intro);
router.get('/regist', companyController.registPage);

// 반려견 dna 조회 (random dna 반환)
router.get('/userdna', companyController.getRandomDNA);

// 유저, 반려견 dna를 블록체인에 등록
router.post('/regist/dna', companyController.registDNA);

module.exports = router;

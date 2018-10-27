"use strict"

const mailSender = require('../modules/mailSender');
const dnaGenerator = require('../modules/dnaGenerator');

let sellingController = {};

sellingController.main = (req, res) => {
    res.render('selling-intro');
};

sellingController.page1 = async (req, res) => {
    //await mailSender.sendMail('jobong07@naver.com', '테스트 메일', '테스트 메일입니다');
    res.render('page1');
};

sellingController.page2 = (req, res) => {
    res.render('page2');
};

module.exports = sellingController;
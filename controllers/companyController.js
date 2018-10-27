"use strict"

const redis = require('redis');
const mailSender = require('../modules/mailSender');
const client = redis.createClient();
const dnaGenerator = require('../modules/dnaGenerator');
const security = require('../modules/security');

let companyController = {};

companyController.intro = (req, res) => {
    res.render('company-intro');
};

companyController.registPage = (req, res) => {
    res.render('company-regist');
};

companyController.getRandomDNA = (req, res) => {
    let dna = dnaGenerator.generateRandomDNA(100);
    res.status(200).json(dna);
}

companyController.registDNA = (req, res) => {
    // bongki
    // req.body = { userId: '', dna: ''}
    // 나할꺼: userId로 데이터베이스 조회해서 이메일 받고
    // 나할꺼: 유저정보 가져오고 pub 키 이메일 세팅하고
    // 봉기할꺼: blockchain에 req.body.dna.toLowerCase() 를 업로드
    try{
        res.status(200);
            
    }catch(ex){
        console.log(ex);
    }
    /*
    if(req.body){
        let mailTitle = req.body.userId + ' 회원님의 반려견 DNA 등록이 완료되었습니다.\n';
        let mailContents = '안녕하세요. 반려견 혈통관리 서비스 MUNGMUNG 입니다.\
            \n회원님의 반려견 DNA가 등록되어 메일 드립니다.\
            \n\n반려견 DNA 등록번호: 4123\
            \n아래 링크를 통해 등록을 완료해주세요.\
            \n\n링크:....' + '\n\n저희 서비스를 이용해 주셔서 감사합니다. \nMUNGMUNG 드림';
        mailSender.sendMail('limkeunhak@gmail.com', mailTitle, mailContents,
         (error, response) => {
                res.status(200).json();
            });
    }*/
}

module.exports = companyController;
"use strict"

const mailSender = require('../modules/mailSender');
const dnaGenerator = require('../modules/dnaGenerator');
const security = require('../modules/security');
const redis = require('redis');
const client = redis.createClient();
const async = require('async');
const Eos = require('eosjs');

let companyController = {};

companyController.intro = (req, res) => {
    res.render('company-intro');
};

companyController.registPage = (req, res) => {
    if(req.session.user){
        if(req.session.user.type === 'agency'){
            res.render('company-regist');
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/login');
    }
};

companyController.getRandomDNA = (req, res) => {
    let dna = dnaGenerator.generateRandomDNA(100);
    res.status(200).json(dna);
}

companyController.getRequestUser = (req, res) => {
    client.keys(req.session.user.id + '_*', function(err, keys){
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
                client.get(key, function (error, value) {
                     if (error) return cb(error);
                     var agency = JSON.parse(value);
                     cb(null, agency);
                 }); 
             }, function (error, results) {
                if (error) return console.log(error);
                res.status(200).json({data:results});
             });
        }
    });
}

companyController.registDNA = (req, res) => {
    var id = req.body.userInfo.generalUserId
    let eos = Eos({
      chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
      keyProvider: [
        '5HsmdzHvWkHq1v54bmehNXfN9qcf7Gwso9DVjxQFQ5YzEJkJaYo'
      ],
      httpEndpoint: 'http://127.0.0.1:8888',
      broadcast: true,
      verbose: true,
      sign: true
    });
  
    try {
      eos.contract('pedigree').then(pedigree => {
          pedigree.add("bongki", id, "enryptedData", "irisData", {
  authorization: ['bongki']});
          res.status(200);
      })
    } catch(e) {
      console.error(e)
    }
  
    var registration_number = 0;
    try {
      eos.getTableRows({
        code: 'pedigree',
        scope: 'pedigree',
        table: 'authnumbers',
        json: true,
      }).then(function(res) {
        registration_number = res.rows[res.rows.length-1].count;
        console.log(registration_number);
        console.log(id);
  
        if(req.body){
            let reg_number = parseInt(registration_number) + 1;
            let mailTitle = id + ' 회원님의 반려견 DNA 등록이 완료되었습니다.\n';
            let mailContents = '안녕하세요. 반려견 혈통관리 서비스 MUNGMUNG 입니다.\
                \n회원님의 반려견 DNA가 등록되어 메일 드립니다.\
                \n\n반려견 DNA 등록번호: ' + reg_number + '\
                \n아래 링크를 통해 등록을 완료해주세요.\
                \n\n링크: http://49.164.52.128:3000/regist/pet?key=' + security.encryptWithoutKey(req.body.userInfo.agencyUserId + '_' + req.body.userInfo.generalUserId) + '\n\n저희 서비스를 이용해 주셔서 감사합니다. \nMUNGMUNG 드림';
            mailSender.sendMail(req.body.userInfo.generalUserEmail, mailTitle, mailContents,
             (error, response) => {
                    res.status(200).json();
                });
        }
  
        });
    } catch(e) {
      console.log("Error Transaction pedigree.add()");
      console.error(e)
    }
  
    res.status(200).json();
}

module.exports = companyController;
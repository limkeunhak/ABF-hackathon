"use strict"

const redis = require('redis');
const async = require('async');
const client = redis.createClient();

let registController = {};

registController.main = (req, res) => {
    res.render('regist-intro');
};

registController.page1 = (req, res) => {
    res.render('page1');
};

registController.registPetPage = (req, res) => {
    if(req.session.user){
        res.render('regist-pet');
    }else{
        res.redirect('/login');
    }
};


registController.registThanksPage = (req, res) => {
    res.render('regist-thanks');
};

registController.registDnaPage = (req, res) => {
    res.render('regist-dna');
};

registController.getAgencyList = (req, res) => {
    let agencyList = [];
    client.keys( '*', function(err, keys){
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
                client.get(key, function (error, value) {
                     if (error) return cb(error);
                     var agency = {};
                     if(JSON.parse(value).type == 'agency'){
                        agency = JSON.parse(value);
                        cb(null, agency);
                     }else{
                         cb(null, null);
                     }
                 }); 
             }, function (error, results) {
                if (error) return console.log(error);
                let deleteNull = [];
                for(let i = 0; i<results.length; i++){
                    if(results[i] !== null){
                        deleteNull.push(results[i]);
                    }
                }
                res.status(200).json({data:deleteNull});
             });
        }
    });
};

module.exports = registController;
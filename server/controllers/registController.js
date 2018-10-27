"use strict"

const redis = require('redis');
const security = require('../modules/security');
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
    if(req.query.key){
        let userId = security.decryptWithoutKey(req.query.key).split('_')[1];
        res.render('regist-pet', { fromUrl:true, userId:userId });
    }
    else if(req.session.user){
        res.render('regist-pet', { fromUrl:false, userId:'' });
    }else{
        res.redirect('/login');
    }
};


registController.registThanksPage = (req, res) => {
    res.render('regist-thanks');
};

registController.registDnaPage = (req, res) => {
    if(req.session.user){
        res.render('regist-dna');
    }else{
        res.redirect('/login');
    }
};

registController.getAgencyList = (req, res) => {
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

registController.registDna = (req, res) => {
    client.get(req.session.user.id, function(err, reply){
        let request = {
            generalUserId: req.session.user.id,
            generalUserEmail: req.session.user.email,
            agencyUserId: req.body.agencyUserId,
            dogDna: '',
            isDone: false,
            tx: '',
            email: reply.email,
            regNo: '',
            link: '',
        };
        
        client.set(req.body.agencyUserId + '_' + req.session.user.id, JSON.stringify(request), function(err, reply){
            res.status(200).json();
        });    
    });
};

module.exports = registController;
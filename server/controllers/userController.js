"use strict"

const userInfo = require('../config/app.config');
const redis = require('redis');
const client = redis.createClient();
const userCreator = require('../repo/user');

let userController = {};

userController.loginPage = (req, res) => {
    res.render('login-page');
};

userController.login = (req, res) => {
    let paramId = req.body.id || req.query.id;
    let paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        res.redirect('/');
    }else{
        client.get(paramId, function(err, reply){
            reply = JSON.parse(reply);
            if(reply && reply.password == paramPassword){
                if(reply.type == 'agency'){
                    req.session.user = {
                        id: paramId,
                        type: 'agency',
                        wallet: reply.pubkey,
                        email: reply.email,
                        authorized: true
                    };
                    res.status(200).json({ success: true });
                }else{
                    req.session.user = {
                        id: paramId,
                        type: 'user',
                        wallet: reply.pubkey,
                        email: reply.email,
                        authorized: true
                    }
                    res.status(200).json({ success: true });
                }                
            }else{
                res.status(200).json({ success: false});
            }            
        });
    }
};

userController.logout = (req, res) => {
    if(req.session.user){
        req.session.destroy((err) => {
            if(err){
                throw err;
            }
        });
        res.redirect('/login');
    }else{
        res.redirect('/');
    }
};

userController.userInfo = (req, res) => {
    if(req.session.user){
        res.render('user-page');
    }else{
        res.redirect('/login');
    }
};

userController.getUserInfo = (req, res) => {
    res.status(200).json(req.session.user);
};

userController.signUpPage = (req, res) => {
    if(req.session.user){
        req.session.destroy((err) => {
            if(err){
                throw err;
            }
        });
        res.render('signup-page');
    }else{
        res.render('signup-page');
    }    
}

userController.signUp = (req, res) => {
    let userId = req.body.userId;
    userCreator.setData(req.body.userId, req.body.password, 
        req.body.userType, req.body.email, req.body.address, 's2d1df1wrj293e4u2e22f259jk2ke12198gwj38i0u1=');
    let user = userCreator.getUser();
    client.set(userId, JSON.stringify(user), function(err, data){
        if(err){
            console.log(err);
        }
    });
    client.get(userId, function(err, reply){
        res.status(200).json(JSON.parse(reply));
    });
}

module.exports = userController;
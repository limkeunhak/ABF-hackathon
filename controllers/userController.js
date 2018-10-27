"use strict"

const userInfo = require('../config/app.config');

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
        if(paramId === userInfo.AGENCY.id && paramPassword === userInfo.AGENCY.password){
            req.session.user = {
                id: paramId,
                type: 'agency',
                wallet: '1w12j32j19dj91s0iqw0i12dwei0',
                authorized: true
            };
        }else{
            req.session.user = {
                id: paramId,
                type: 'user',
                wallet: 'd80928102is31201212ijdu2e2',
                authorized: true
            }
        }

        res.redirect('/');
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

module.exports = userController;
"use strict"

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

module.exports = registController;
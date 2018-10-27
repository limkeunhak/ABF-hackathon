"use strict"

let registController = {};

registController.main = (req, res) => {
    res.render('regist-intro');
};

registController.page1 = (req, res) => {
    res.render('page1');
};

registController.registPetPage = (req, res) => {
    res.render('regist-pet');
};


registController.registThanksPage = (req, res) => {
    res.render('regist-thanks');
};

module.exports = registController;
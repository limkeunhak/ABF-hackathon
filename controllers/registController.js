"use strict"

let registController = {};

registController.main = (req, res) => {
    res.render('regist-intro');
};

registController.page1 = (req, res) => {
    res.render('page1');
};

registController.page2 = (req, res) => {
    res.render('page2');
};

module.exports = registController;
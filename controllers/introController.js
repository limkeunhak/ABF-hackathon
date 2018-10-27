"use strict"

let introController = {};

introController.main = (req, res) => {
    res.render('main-intro');
};

introController.page1 = (req, res) => {
    res.render('page1');
};

introController.page2 = (req, res) => {
    res.render('not-impl');
};

module.exports = introController;
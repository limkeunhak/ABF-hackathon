"use strict"

let inquiryController = {};

inquiryController.main = (req, res) => {
    res.render('inquiry-intro');
};

inquiryController.page1 = (req, res) => {
    res.render('page1');
};

inquiryController.page2 = (req, res) => {
    res.render('page2');
};

module.exports = inquiryController;
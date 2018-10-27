"use strict"

let additionalServiceController = {};

additionalServiceController.main = (req, res) => {
    res.render('service-intro');
};

additionalServiceController.page1 = (req, res) => {
    res.render('page1');
};

additionalServiceController.page2 = (req, res) => {
    res.render('page2');
};

module.exports = additionalServiceController;
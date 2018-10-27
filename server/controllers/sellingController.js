"use strict"

const dnaGenerator = require('../modules/dnaGenerator');

let sellingController = {};

sellingController.main = (req, res) => {
    res.render('selling-intro');
};

sellingController.page1 = async (req, res) => {
    res.render('page1');
};

sellingController.page2 = (req, res) => {
    res.render('page2');
};

module.exports = sellingController;
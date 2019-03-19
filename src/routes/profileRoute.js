var express = require('express');
var mongodb = require('mongodb').MongoClient;
var profileRouter = express.Router();

var menu = [{
        href: '/buyTokens',
        text: 'Buy SATs'
    },
    {
        href: '/sellTokens',
        text: 'Sell SATs'
    },
    {
        href: '#',
        text: 'Become a Reviewer'
    }
];

var p_router = function() {
    profileRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                res.render('profile', {
                    title: "SmartReviewer",
                    navMenu: menu,
                    user: req.user,
                    balance: 0
                });
            }
        });
    return profileRouter;
}
module.exports = p_router;
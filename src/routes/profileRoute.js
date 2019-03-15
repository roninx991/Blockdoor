var express = require('express');
var mongodb = require('mongodb').MongoClient;
var profileRouter = express.Router();
var p_router = function(menu) {
    profileRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                res.render('profile', {
                    title: "SmartReviewer",
                    navMenu: menu
                });
            }
        });
    return profileRouter;
}
module.exports = p_router;
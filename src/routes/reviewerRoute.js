var express = require('express');
var mongodb = require('mongodb').MongoClient;
var reviewerRouter = express.Router();
var p_router = function(menu) {
    reviewerRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                const url = 'mongodb://localhost:27017';
                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('NodeDemoWebApp');
                    const Submissions = db.collection('Submissions');

                    Submissions.find({"reviews.Reviewerid":{$ne:req.user._id}}).toArray(function(err,ans){
                        if(err){
                            console.log(err);    
                        }
                        else{
                            res.render('reviewer', {
                                title: "SmartReviewer",
                                navMenu: menu,
                                user: req.user, 
                                sub : ans
                            });
                             console.log(ans);

                        }    
                    });    
                });          
            }
        });


    return reviewerRouter;
}
module.exports = p_router;
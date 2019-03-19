var date = new Date();
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var yesnoRouter = express.Router();
var u_router = function() {
    yesnoRouter.route("/")
        .post(function(req, res) {
            const url = 'mongodb://localhost:27017';
                        mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                            console.log("Successfully connected to database.");
                            
                            const db = client.db('NodeDemoWebApp');
                            // const Users = db.collection('Users');
                            const Submissions = db.collection('Submissions');
                            console.log(req.body.marks);
                            Submissions.updateOne({hash:req.body.hashvalue},{$addToSet:{reviews:{Reviewerid:req.user._id ,Marks:req.body.marks,Comments:req.body.comments}}}, function(err, result) {
                                if(err == undefined) {
                                    console.log("Successfully updated");
                                }
                                else console.log(err);
                            });
                        });
                    res.redirect("/u");
                });

           
                       
    return yesnoRouter;
}
module.exports = u_router;
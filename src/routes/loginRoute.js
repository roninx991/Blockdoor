var express = require('express');
var mongodb = require('mongodb').MongoClient;
var usersRouter = express.Router();
var u_router = function() {
    usersRouter.route("/")
        .post(function(req, res) {
            const url = 'mongodb://localhost:27017';
            mongodb.connect(url, function(err, client) {
                console.log("Successfully connected to database.");
                const db = client.db('NodeDemoWebApp');
                const Users = db.collection('Users');
                Users.find({ uname: req.body.uname, pwd: req.body.pwd }).toArray(function(err, docs) {
                    if (docs.length == 0) {
                        res.send({
                            msg: "Invalid username or password",
                            code: "error"
                        });
                    } else {
                        res.send({
                            msg: "Login success",
                            code: "success"
                        });
                    }
                });
            });
        });
    return usersRouter;
}
module.exports = u_router;
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;
module.exports = function(passport) {
    passport.use('local', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            var url = 'mongodb://localhost:27017/';
            mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                console.log("Successfully connected to database.");
                const db = client.db('NodeDemoWebApp');
                const Users = db.collection('Users');

                if (err) { done(null, false, { message: 'Error connecting to database.' }); }
                Users.findOne({ uname: username }, function(err, results) {
                    if (err == undefined) {
                        if (results.pwd == password) {
                            var user = results;
                            done(null, user);
                        } else {
                            done(null, false, { message: 'Invalid Password' });
                        }
                    } else {
                        done(null, false, { message: 'Invalid Username' });
                    }
                });
            });
        }));
};
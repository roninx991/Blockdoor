var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

var mongodb = require('mongodb').MongoClient;

module.exports=function(){
	passport.use(new LocalStrategy({
		uname: 'lgn-uname',
		pwd: 'lgn-password'
	},
	function(username, password, done){
		var url = 'mongodb://localhost:27017';
		mongodb.connect(url, function(err, client){
			if(err){
				done(null, false, {message:'Something went wrong'});	
			}
			console.log("Successfully connected to database.");
			const db=client.db('NodeDemoWebApp');
			const Users = db.collection('Users');
			
			Users.findOne({uname:username}, function(err, results){
				if(results.Password==password){  
						var user=results;  
						done(null,user);  
				}  
				else{  
						done(null,false, {message:'Invalid Credentials'});  
				}  				
			});
		});
	}));
}
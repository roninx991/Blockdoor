const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const ipfs = ipfsAPI('localhost', '5001');
var date = new Date();
var express = require('express');
var mongodb = require('mongodb').MongoClient;

var uploadRouter = express.Router();
var u_router = function(web3) {
    uploadRouter.route("/")
        .post(function(req, res) {
            if (Object.keys(req.files).length == 0) {
                return res.status(400).send('No files were uploaded.');
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            let sampleFile = req.files.file;

            var fname = req.files.file.name;
            var pathname = 'public/static/' + fname;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(pathname, function(err) {
                if (err)
                    return res.status(500).send(err);

                let testFile = fs.readFileSync(pathname);
                let testBuffer = new Buffer.from(testFile);

                ipfs.files.add(testBuffer, function(err, file) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log(req);
                        const url = 'mongodb://localhost:27017';
                        mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                            console.log("Successfully connected to database.");

                            const db = client.db('NodeDemoWebApp');
                            // const Users = db.collection('Users');
                            const Submissions = db.collection('Submissions');
                            Submissions.insertOne({ owner: req.user._id, hash: file[0].hash, timestamp: new Date(Date.now()).toISOString(), status: 'Pending' }, function(err, result) {
                                if (err == undefined) {
                                    console.log("Successfully uploaded File");
                                } else console.log(err);
                            });
                        });
                    }
                    res.redirect("/u");
                });
            });
        });
    return uploadRouter;
}
module.exports = u_router;
var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');
// var multer  = require('multer');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
// var path = require('path');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');

const fileUpload = require('express-fileupload');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// const ipfsAPI = require('ipfs-api');
// const fs = require('fs');

// const ipfs = ipfsAPI('localhost', '5001');


// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
//   },
// });

// const upload = multer({ storage });






var app = new express();
var port = 3000;

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on port " + port);
    }
});

var menu = [{
        href: '/',
        text: 'Home'
    },
    {
        href: '/#about',
        text: 'About Us'
    },
    {
        href: '/#contact',
        text: 'Contact Us'
    }
];

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'reviewmethereum', resave: true, saveUninitialized: true }));
// app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true })); 
// app.use(methodOverride()); 
app.use(fileUpload());

require('./src/configuration/passport')(app, passport);

var registerRouter = require('./src/routes/registrationRoute')(web3);
var profileRouter = require('./src/routes/profileRoute')(menu);
var uploadRouter = require('./src/routes/uploadRoute')();
var reviewerRouter = require('./src/routes/reviewerRoute')(menu);
var yesnoRouter = require('./src/routes/yesnoRoute')();

app.use('/register', registerRouter);
app.use('/upload', uploadRouter);
app.use('/u', reviewerRouter);
app.use('/review',yesnoRouter)

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.user) {
        res.redirect('/u');
    } else {
        res.render('index', {
            title: "SmartReviewer",
            heading: "The next generation conference paper reviewing system",
            navMenu: menu
        });
    }

});

app.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        console.log("Success");
        res.redirect('/u');
    });


// // SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })

// app.post('/upload', upload.single('file'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file)
  
// })




// app.post('/upload', function(req, res) {
//     console.log('body: ' + JSON.stringify(req.files));
  
//     let testFile = fs.readFileSync(req.files.file.path);
//     //Creating buffer for ipfs function to add file to the system
//     let testBuffer = new Buffer(testFile);

//         ipfs.files.add(testBuffer, function (err, file) {
//             if (err) {
//               console.log(err);
//             }
//             console.log(file)
//           })

// })


// /*  upload POST endpoint */
// app.post('/upload', upload.single('file'), (req, res) => {
//   // if (!req.file) {
//   //   return res.status(422).json({
//   //     error: 'File needs to be provided.',
//   //   });
//   // }

//   const mime = req.file.mimetype;
//   // if (mime.split('/')[0] !== 'image') {
//   //   fs.unlink(req.file.path);

//   //   return res.status(422).json({
//   //     error: 'File needs to be an image.',
//   //   });
//   // }

//   const fileSize = req.file.size;
//   if (fileSize > MAX_SIZE) {
//     fs.unlink(req.file.path);

//     return res.status(422).json({
//       error: `Image needs to be smaller than ${MAX_SIZE} bytes.`,
//     });
//   }

//   const data = fs.readFileSync(req.file.path);
//   return ipfs.add(data, (err, files) => {
//     fs.unlink(req.file.path);
//     if (files) {
//       return res.json({
//         hash: files[0].hash,
//       });
//     }

//     return res.status(500).json({
//       error: err,
//     });
//   });
// });








// app.post('/upload', function(req, res) {
//   if (Object.keys(req.files).length == 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.file;
//   var fname = req.files.file.name;
//   var pathname = 'public/static/'+fname; 
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(pathname, function(err) {
//     if (err)
//       return res.status(500).send(err);
//     let testFile = fs.readFileSync(pathname);
//     console.log(pathname);
//     let testBuffer = new Buffer.from(testFile);
//     console.log(testBuffer);
//      ipfs.files.add(testBuffer, function (err, file) {
//             if (err) {
//               console.log(err);
//             }
//             console.log(file)
//             res.send('File uploaded!');
//           })

    
//   });
// });
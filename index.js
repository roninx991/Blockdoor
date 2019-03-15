var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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

require('./src/configuration/passport')(app, passport);

var registerRouter = require('./src/routes/registrationRoute')(web3);
var profileRouter = require('./src/routes/profileRoute')(menu);

app.use('/register', registerRouter);
app.use('/u', profileRouter);

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
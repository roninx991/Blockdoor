var express = require('express');
var bodyParser= require('body-parser');
var Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var app = new express();
var port = 3000;

app.listen(port, function(err){
	if(typeof(err) == "undefined") {
		console.log("Your application is running on port " + port);
	}
});

var menu =  [
				{
					href:'/',
					text:'Home'
				},
				{
					href:'/#about',
					text:'About Us'
				},
				{
					href:'/#contact',
					text:'Contact Us'
				}
			];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var registerRouter=require('./src/routes/registrationRoute')(web3);
var loginRouter=require('./src/routes/loginRoute')();

app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index', {
		title: "SmartReviewer",
		heading: "The next generation conference paper reviewing system",
		navMenu: menu
	});
});


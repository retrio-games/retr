const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.ico')));

app.get('/', function(request, response) {
	response.render('pages/home',{
		css: "home.css", 
		title: "Retr.io Games"
	});
});

app.get('/character-customization', function(request, response) {
	response.render('pages/character-customization',{
		css: "character-customization.css", 
		title: "Retr.io Games: Character Customization"
	});
});

app.get('/sign-in', function(request, response) {
	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
});

app.get('/sign-up', function(request, response) {
	response.render('pages/sign-up',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign Up"
	});
});

app.get('/game-room', function(request, response) {
	response.render('pages/game-room',{
		css: "game-room.css", 
		title: "Retr.io Games: Game Room",
		data: null
	});
});

app.get('/game-of-life', function(request, response) {
	response.render('pages/game-of-life',{
		css: "game-of-life.css", 
		title: "Retr.io Games: Game of Life"
	});
});

const port = process.env.PORT || 8000;
app.listen(port);
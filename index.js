const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
//var session = require('express-session');
var pgp = require('pg-promise')();
const favicon = require('serve-favicon');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.ico')));

const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'casino',
  password: 'password',
  port: 5432,
})


/* Cookie */

var user = {
  userID: "",
  displayID: "",
  statsID: ""
}
app.get('/setuser', function(request, response){
  response.cookie("userID", user.userID);
  response.cookie("displayID", user.displayID);
  response.cookie("statID", user.statID);
  response.send('user data added to cookie');
});

/*Variables*/


/* basic route to home page */
app.get('/', function(request, response) {
	response.render('pages/home',{
		css: "home.css", 
		title: "Retr.io Games"
	});
});

/* sign-up */
app.get('/sign-up', function(request, response){
	response.render('pages/sign-up',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign Up"
	});
});

app.post('/sign-up', function(request, response){
	user.userID = request.body.email; // somehow get the actual user_ID not the email
	var email = request.body.email;
	var pwd   = request.body.password;
	var query = 'INSERT INTO users (username, user_password) VALUES (\''+ email +'\', \''+ pwd +'\');'
	db.query(query)
	response.render('pages/character-customization',{
		css: "character-customization.css", 
		title: "Retr.io Games: Character Customization"
	});
});


/* INTEGRATE THIS
sign in 
app.get('/sign-in', function(request, response){
  var email = request.body.email;
  var pwd = request.body.password;
  var query = 'SELECT user_ID, display_ID, stat_ID FROM users WHERE username = '+ email +', user_password = '+ pwd +';'
  // check if query exsist
  // if it does send user_ID, display_ID, and stat_ID to user.userID etc --> and send user to game room page
  // if query does not exsist then ask to re-enter username/password or whatever
});
*/
app.get('/sign-in', function(request, response) {
	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
});

/* character customization */

app.get('/character-customization', function(request, response) {
	response.render('pages/character-customization',{
		css: "character-customization.css", 
		title: "Retr.io Games: Character Customization"
	});
});

app.post('/sign-up/cc', function(request, response){
	var name = request.body.characterName;
	var color = request.body.characterColor.value;
	var query = 'INSERT INTO display (display_name, shape, color) VALUES ( \''+ name +'\', \'square\', \''+ color +'\');'
	db.query(query)
	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
	// match display_ID incremented in display table to the empty display_ID in user table
});


/* game-room */

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

/* black-jack */

app.get('/blackJack', function(request, response) {
	response.sendFile('views/blackJack.html',{
		root:__dirname
	});
});

/* sign-out -- delete cookies */
app.get('/sign-out', (request, response) => {
  response.clearCookie('userID');
  response.clearCookie('displayID');
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port ' + port);

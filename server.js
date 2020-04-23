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

var currentUser=''
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
/* TODO
1. create a check to make sure username doesn't exist already*/
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
	var query3 = 'SELECT count(user_id) FROM users WHERE user_id = \''+ email +'\';'
	db.query(query3)
	.then( function(rows){
		console.log(rows);
  		console.log(rows.rows[0].count);
  		if (rows.rows[0].count > 0){
		      console.log("Email Already Used.");
		      response.render('pages/sign-up',{
		      	css: "sign-in-and-sign-up.css", 
		      	title: "Retr.io Games: Sign In"
		      });
		}
	});	
	return;
	var query = 'INSERT INTO users (user_id, user_password) VALUES (\''+email+'\', \''+ pwd +'\');'
	var query1= 'INSERT INTO stats (stats_id, games_played, account_balance, games_won, games_lost, net_profit) VALUES (\''+email+'\',0,100,0,0,0);'
	db.query(query)
	db.query(query1)
	currentID = email;
	response.render('pages/character-customization',{
		css: "character-customization.css", 
		title: "Retr.io Games: Character Customization"
	});
});

//app.get('/character-customization', function(request, response) {	
//	response.render('pages/character-customization',{
//		css: "character-customization.css", 
//		title: "Retr.io Games: Character Customization"
//	});
//});

app.post('/character-customization', function(request, response){
	var name = request.body.charName;
	var color = request.body.charColor;
	var shape = request.body.charShape;
	var query = 'INSERT INTO display (display_id, display_name, shape, color) VALUES (\''+currentID+'\', \''+ name +'\', \''+ shape +'\', \''+ color +'\');'
	db.query(query)
	response.render('pages/game-room',{
		name:name,
		color:color,
		shape:shape,
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
		
	});
	// match display_ID incremented in display table to the empty display_ID in user table
});

app.get('/sign-in', function(request, response) {
	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
});


/* INTEGRATE THIS
sign in */
app.post('/sign-in', function(request, response){
  var email = request.body.email;
  var pwd = request.body.password;
  var query = 'SELECT count(user_id) FROM users WHERE username = \''+ email +'\' AND user_password = \''+ pwd +'\';'
  var result = 'SELECT shape, color FROM display WHERE display_id = \''+ email +'\';' 
  db.task('get-everything', task => {
        return task.batch([
            task.any(query),
            task.any(result)
        ]);
    })
    .then(info => {
    	console.log(info);
    })
    .catch(error => {
        
    });
  /*
  db.query(query)
  .then( function(rows){
  	console.log(rows);
  	console.log(rows.rows[0].count);
  	if (rows.rows[0].count == 0){
  	console.log("failed to get user");
  	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
  }
  else{
  	response.render('pages/game-room',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
  	
  }
  })
  */
  /*
  .catch( function(err){
  	response.render('pages/sign-in',{
		css: "sign-in-and-sign-up.css", 
		title: "Retr.io Games: Sign In"
	});
  })
  */
  // check if query exsist
  // if it does send user_ID, display_ID, and stat_ID to user.userID etc --> and send user to game room page
  // if query does not exsist then ask to re-enter username/password or whatever
});
/**/

/* character customization */


/* game-room */

//app.get('/game-room', function(request, response) {
//	db.any(query)
//	response.render('pages/game-room',{
//		css: "game-room.css", 
//		title: "Retr.io Games: Game Room",
//		data: 
//	});
//});

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

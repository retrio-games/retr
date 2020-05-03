const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
var pgp = require('pg-promise')();
const favicon = require('serve-favicon');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(cookieParser())
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.ico')));


/*const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'casino',
	user: 'postgres',
	password: 'password'
};*/
const dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);


var currentUser=''

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
	var email = request.body.email;
	var pwd   = request.body.password;
	var query3 = 'SELECT count(user_ID) FROM users WHERE user_ID = \''+ email +'\';'
	db.query(query3)
	.then( function(rows){
  		if (rows[0].count > 0){
		      console.log("Email Already Used.");
		      response.render('pages/sign-up',{
		      	css: "sign-in-and-sign-up.css",
		      	title: "Retr.io Games: Sign In"
		      });
          return;
		}
    var query = 'INSERT INTO users (user_id, user_password) VALUES (\''+email+'\', \''+ pwd +'\');'
  	var query1= 'INSERT INTO stats (stats_id, games_played, account_balance, games_won, games_lost, net_profit) VALUES (\''+email+'\',0,100,0,0,0);'
  	db.query(query)
  	db.query(query1)
  	currentUser = email;
  	response.render('pages/character-customization',{
  		css: "character-customization.css",
  		title: "Retr.io Games: Character Customization"
	});

	});
});


app.post('/character-customization', function(request, response){
	var name = request.body.charName;
	var color = request.body.charColor;
	var shape = request.body.charShape;
	var query = 'INSERT INTO display (display_id, display_name, shape, color) VALUES (\''+currentUser+'\', \''+ name +'\', \''+ shape +'\', \''+ color +'\');'
	db.query(query)
	response.render('pages/game-room',{
		name: name,
		color: color,
		shape: shape,
    	        css: "game-room.css",
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
  currentUser = email;
  var pwd = request.body.password;
  var query = 'SELECT count(user_ID) FROM users WHERE user_id = \''+ email +'\' AND user_password = \''+ pwd +'\';'
  var result = 'SELECT shape, color, display_name FROM display WHERE display_id = \''+ email +'\';'
  db.task('get-everything', task => {
        return task.batch([
            task.any(query),
            task.any(result)
        ]);
    })
    .then(info => {
      if(info[0][0].count == 0){
        response.render('pages/sign-in',{
    		  css: "sign-in-and-sign-up.css",
    		title: "Retr.io Games: Sign In"
      })
      return;
      }
      else{
        console.log(info[1][0].display_id);
        response.render('pages/game-room',{
          name: info[1][0].display_name,
      		color: info[1][0].color,
      		shape: info[1][0].shape,
    		  css: "game-room.css",
    		title: "Retr.io Games: Game Room"
      })
      }
    })
  });




/* game-room */

app.get('/game-room', function(request, response) {
	var query = 'SELECT display_name,shape, color FROM display WHERE display_id = \''+currentUser+'\';'
	db.any(query)
	.then(function(rows) {
		response.render('pages/game-room',{
			css: "game-room.css",
			title: "Retr.io Games: Game Room",
			name: rows[0].display_name,
			shape: rows[0].shape,
			color: rows[0].color
		});
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
	var query = 'SELECT account_balance FROM stats WHERE stats_id = \''+currentUser+'\';'
	var query1 = 'SELECT display_name FROM display WHERE display_id = \''+currentUser+'\';'
    var query2 = 'SELECT games_won FROM stats WHERE stats_id = \''+currentUser+'\';'
    var query3 = 'SELECT games_lost FROM stats WHERE stats_id = \''+currentUser+'\';'
  db.task('get-everything', task => {
        return task.batch([
            task.any(query),
            task.any(query1),
            task.any(query2),
            task.any(query3)
        ]);
    })
    .then(info => {
        response.render('pages/blackjack',{
		balance:info[0][0].account_balance,
	  	name:info[1][0].display_name,
        gw:info[2][0].games_won,
        gl:info[3][0].games_lost,
    		  css: "sign-in-and-sign-up.css",
    		title: "Retr.io Games: Blackjack"
      });
    });
});

app.post('/blackJack', function(request, response) {
	var query = 'UPDATE stats SET account_balance = \''+request.body.balance+ '\', games_won = \''+request.body.gw+'\', games_lost = \''+request.body.gl+'\' WHERE stats_id = \''+currentUser+'\';';
	var query1 = 'SELECT shape FROM display WHERE display_id= \''+currentUser+'\';'
	var query2 = 'SELECT color FROM display WHERE display_id= \''+currentUser+'\';'
	var query3 = 'SELECT display_name FROM display WHERE display_id = \''+currentUser+'\';'

  db.task('get-everything', task => {
        return task.batch([
            task.any(query),
            task.any(query1),
            task.any(query2),
            task.any(query3),
        ]);
    })
    .then(info => {
        response.render('pages/game-room',{
		shape: info[1][0].shape,
		color: info[2][0].color,
		name: info[3][0].display_name,
		css: "game-room.css",
		title: "Retr.io Games: Game Room"
      });
    });
});

/* sign-out -- delete cookies */
app.get('/sign-out', function(request, response) {
      currentUser = '';
	response.render('pages/home',{
		css: "home.css",
		title: "Retr.io Games"
	});
});

app.get('/stats', function(request, response) {
	var query = 'SELECT * FROM stats WHERE stats_id = \''+currentUser+'\';'
	db.any(query)
	.then(function(rows) {
		response.render('pages/stats',{
			css: "game-room.css",
			title: "Retr.io Games: Stats Room",
			games_played: rows[0].games_won+rows[0].games_lost,
			hands_won: rows[0].games_won,
			hands_lost: rows[0].games_lost,
			account_balance: rows[0].account_balance
		});
	});
})

const port = process.env.PORT; //|| 3000;
app.listen(port);

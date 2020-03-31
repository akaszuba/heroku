require('dotenv').config();
const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');

const users = require("./db/users");
const home = require('./routes/home');
const login = require('./routes/login');

const app = express();
const port = process.env.PORT;

const db = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
global.db = db;

const sess = {
  secret: "tajny_klucz",
  resave: false,
  saveUninitialized: true,
};


passport.use(new Strategy(
  function (username, password, cb) {
    users.findByUsername(username)
      .then(user => {
        if (user) {
          cb(null, user);
        } else {
          cb("Can't find user", null);
        }
      });
  }));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());



//db.query("www",function(error,results))

















app.get('/', home.index);
app.get('/login', login.index);
//app.post('/login',login.login);
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

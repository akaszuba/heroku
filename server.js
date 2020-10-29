require('dotenv').config();
const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

const users = require("./db/users");
const home = require('./routes/home');
const login = require('./routes/login');

const app = express();
const port = process.env.PORT;

const db = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
global.db = db;
global.passport = passport;

const sess = {
  secret: "tajny_klucz",
  resave: false,
  saveUninitialized: true,
  
};


passport.use(new Strategy({
  session: true,
  failureMessage: true
},
  function (username, password, cb) {
    users.findByUsername(username)
      .then(user => {
        if (user) {
          cb(null, user);
        } else {
          cb(null, null,{message:"Can't find user"});
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
app.use(flash());




app.get('/', home.index);
app.get('/login', login.index);
//app.post('/login',login.login);
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' , failureFlash:true}),
  function (req, res) {
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

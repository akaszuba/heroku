require('dotenv').config();
const mysql = require("mysql");
const express = require('express');
const home = require('./routes/home')

const app = express();
const port = process.env.PORT;

const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;

app.set('port',port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', home.index);

app.listen(port,()=>{
  console.log(`Server running on port: ${port}`);
});
